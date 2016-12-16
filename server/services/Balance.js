let Service = require('../lib/service');

class NewService extends Service {

    prepareBalanceFormat(result) {
        let currentBalance = result[0].balance;

        return result.map((item, i) => {
            if (i !== 0) {
                currentBalance = currentBalance+item.balance;
                return [new Date(item.date).getTime(), currentBalance];
            } else {
                return [new Date(item.date).getTime(), currentBalance];
            }
        })
    }

    getBalance() {
        return new Promise((resolve, reject) => {
            this.getModel('Balance')
                .getBalance()
                .then(this.prepareBalanceFormat)
                .then(resolve)
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
