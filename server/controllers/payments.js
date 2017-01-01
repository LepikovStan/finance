let Controller = require('../lib/controller');
let fs = require('fs');
let _ = require('lodash');

module.exports = class extends Controller {
    get(req, res) {
        let type = _.get(req, 'params.type') || 'list';
        let query = _.get(req, 'query');
        let filter = _.get(query, 'filter');
        let user = _.get(req, 'user');
        let payments;

        if (type === 'last') {
            return this
                .getService('Payments')
                .getLast(user.id)
                .then((payments) => {
                    if (filter){
                        return _.slice(payments, 0, filter);
                    } else {
                        return payments;
                    }
                })
                .then((payments) => {
                    res.json({
                        status: 'ok',
                        result: payments
                    });
                })
        }
        if (type === 'future') {
            return this
                .getService('Payments')
                .getFuture(user.id)
                .then((payments) => {
                    if (filter){
                        return _.slice(payments, 0, filter);
                    } else {
                        return payments;
                    }
                })
                .then((payments) => {
                    res.json({
                        status: 'ok',
                        result: payments
                    });
                })
        }

        res.json({
            status: 'ok',
            result: payments
        });
    }
}
