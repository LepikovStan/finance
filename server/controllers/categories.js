let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    get(req, res) {
        let categories = this
            .getService('Categories')
            .getAll()
            .then((categories) => {
                res.json({
                    status: 'ok',
                    result: categories
                });
            });
    }
}
