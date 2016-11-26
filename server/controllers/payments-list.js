let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    get(req, res) {
        let str = fs.readFileSync(`${__dirname}/../data/payments.json`, {encoding: 'utf8'})
        res.json({
            status: 'ok',
            result: JSON.parse(str)
        });
    }
}
