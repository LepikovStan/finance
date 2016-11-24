let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    get(req, res) {
        if (/text\/html/.test(req.headers.accept)) {
            res.sendFile(this.app.paths.mainTemplate);
        } else {
            res
                .status(500)
                .send('Internal server error');
        }
    }
}
