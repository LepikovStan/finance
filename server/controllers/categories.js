let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    get(req, res) {
        res.json({
            status: 'ok',
            result: [
                {id: 2, name: 'Cat 1', income: true, outgo: true},
                {id: 4, name: 'Cat 2', income: false, outgo: true},
                {id: 5, name: 'Cat 3', income: true, outgo: false}
            ]
        });
    }
}
