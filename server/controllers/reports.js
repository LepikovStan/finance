let Controller = require('../lib/controller');
let fs = require('fs');
let _ = require('lodash');

module.exports = class extends Controller {
    get(req, res) {
        const Reports = this.getService('Reports')

        Reports
            .getCategories()
            .then(Reports.prepareForReport)
            .then((data) => {
                console.log('data', data)
                res.json({
                    status: 'ok',
                    result: data
                });
            })
    }
}
