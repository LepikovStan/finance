const Controller = require('../lib/controller');
const fs = require('fs');
const _ = require('lodash')

module.exports = class extends Controller {
    delete(req, res) {
        let {paymentId} = req.params;
        paymentId = Number(paymentId);

        if (isNaN(paymentId)) {
            let error = new TypeError('There is wrong type of paymentId to delete it')
            return res.json({ status: 'error', message: error.message });
        }

        this
            .getService('Payments')
            .delete({id: paymentId, userId: req.user.id})
            .then((result) => {
                res.json({ status: 'ok' });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    post(req, res) {
        let payment = req.body,
            Balance = this.getService('Balance');

        payment.userId = req.user.id

        this
            .getService('Payments')
            .add(payment)
            // .then(Balance.update(payment))
            .then((payment) => {
                res.json({ status: 'ok', result: payment });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    put(req, res) {
        let payment = req.body;
        payment.id = Number(req.params.paymentId);
        payment.userId = req.user.id;

        if (!payment.id) {
            let error = new ReferenceError('Parameter id is mandatory for changing payment');
            res.json({
                status: 'error',
                message: error.message
            });
            console.error(error)
            return
        }

        this
            .getService('Payments')
            .change(payment)
            .then((result) => {
                res.json({ status: 'ok', result: payment });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
