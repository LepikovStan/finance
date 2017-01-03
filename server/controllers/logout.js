let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    get(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.json({status: 'error'})
            }

            res.json({status: 'ok'})
        })
    }
}
