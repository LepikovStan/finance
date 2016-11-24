let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    get(req, res) {
        res.json([
            {name: 'Cat 1', income: true, outgo: true},
            {name: 'Cat 2', income: false, outgo: true},
            {name: 'Cat 3', income: true, outgo: false}
        ]);
    }
}
