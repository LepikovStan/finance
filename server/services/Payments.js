let Service = require('../lib/service');

class Categories extends Service {
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

        // return new Promise((resolve, reject) => {
        //     this
        //         .getModel('Payments')
        //         .add(payment)
        //         .then((result) => {
        //             payment.id = result.insertId;
        //             resolve(payment);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
        // });
    }
};

module.exports = (app) => {
    return new Categories(app)
}
