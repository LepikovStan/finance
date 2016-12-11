let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    delete(req, res) {
        res.json({ status: 'ok' });
    }

    post(req, res) {
        this.getService('Categories')
            .add({name: req.body.categoryName, income: true, outgo: true})
            .then((category) => {
                res.json({ status: 'ok', result: category });
            });
    }

    put(req, res) {
        res.json({ status: 'ok', result: req.body.category });
    }
}
