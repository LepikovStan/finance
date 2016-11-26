let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    delete(req, res) {
        res.json({ status: 'ok' });
    }

    post(req, res) {
        let id = Math.round(Math.random()*1000);

        res.json({ status: 'ok', result: {id, name: req.body.categoryName, income: true, outgo: true} });
    }
}
