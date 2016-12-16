let Service = require('../lib/service');

class NewService extends Service {
    getAll() {
        return this
            .getModel('Payments')
            .getAll();
    }

    getLast() {
        return this
            .getModel('Payments')
            .getLast();
    }

    getFuture() {
        return this
            .getModel('Payments')
            .getFuture();
    }

    add(payment) {
        if (payment.type === 'outgo') {
            payment.amount = -Math.abs(payment.amount)
        }

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getModel('Payments').add(payment),
                this.getModel('Categories').getById(payment.categoryId)
            ])
            .then(([paymentResult, categories]) => {
                let category = categories[0];

                payment.id = paymentResult.insertId;
                payment.category_name = category.name;
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
