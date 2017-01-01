let Service = require('../lib/service');
const _ = require ('lodash');

class NewService extends Service {

    sortByDate(format) {
        return (payments) => {
            return payments.sort((a, b) => {
                if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
                    return format === 'desc' ? 1 : -1;
                } else {
                    return format === 'desc' ? -1 : 1;
                }
            })
        }
    }

    prepareFormat(payments) {
        return payments.reduce((memo, item) => {
            memo[item.id] = item;
            return memo;
        }, {});
    }

    filter(filter) {
        return (payments) => {
            if (filter){
                return _.slice(payments, 0, filter);
            } else {
                return payments;
            }
        }
    }

    getAll(userId) {
        return this
            .getModel('Payments')
            .getAll({userId});
    }

    getLast(userId) {
        return this
            .getModel('Payments')
            .getLast({userId});
    }

    getFuture(userId) {
        return this
            .getModel('Payments')
            .getFuture({userId});
    }

    delete(payment) {
        return this
            .getModel('Payments')
            .delete(payment)
    }

    change(payment) {
        if (payment.type === 'outgo') {
            payment.amount = -Math.abs(payment.amount)
        } else {
            payment.amount = Math.abs(payment.amount)
        }

        return new Promise((resolve, reject) => {
            this
                .getModel('Payments')
                .change(payment)
                .then((result) => {
                    payment.id = result.insertId;
                    resolve(payment);
                })
        });
    }

    add(payment) {
        if (payment.type === 'outgo') {
            payment.amount = -Math.abs(payment.amount)
        } else {
            payment.amount = Math.abs(payment.amount)
        }

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getModel('Payments').add(payment),
                this.getModel('Categories').getById(payment)
            ])
            .then(([paymentResult, categories]) => {
                let category = categories[0];

                payment.id = paymentResult.insertId;
                payment.categoryName = category.name;
                resolve(payment);
            })
            .catch((error) => {
                console.log(error);
            })
        })
    }
};

module.exports = (app) => {
    return new NewService(app)
}
