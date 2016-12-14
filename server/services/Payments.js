let Service = require('../lib/service');

class Categories extends Service {
    getAll() {
        return this
            .getModel('Payments')
            .getAll();
    }

    add(payment) {
        return new Promise((resolve, reject) => {
            this
                .getModel('Payments')
                .add(payment)
                .then((result) => {
                    payment.id = result.insertId;
                    resolve(payment);
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }
};

module.exports = (app) => {
    return new Categories(app)
}
