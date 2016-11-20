let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    get(req, res) {
        fs
            .createReadStream(`${__dirname}/../data/payments.json`, {encoding: 'utf8'})
            .pipe(res);
    }
}
