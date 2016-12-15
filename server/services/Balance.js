let Service = require('../lib/service');

class NewService extends Service {

    getBalance() {
        return new Promise((resolve, reject) => {
            this.getModel('Balance')
                .getBalance()
                .then((result) => {
                    let balance = result.map((item) => {
                        return [new Date(item.date).getTime(), item.balance];
                    })
                    resolve(balance);
                })
        })
    }

    update(payment) {
        return new Promise((resolve, reject) => {
            this
                .getModel('Balance')
                .update(payment)
                .then(() => {
                    resolve(payment);
                });
        })
    }
};

module.exports = (app) => {
    return new NewService(app)
}
