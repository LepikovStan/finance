let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    get(req, res) {
        this.getService('Balance')
            .getBalance()
            .then((balance) => {
                res.json({
                    status: 'ok',
                    result: balance
                });
            })
    }
}
