let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {

    post(req, res) {
        let {login, pass} = req.body

        this
            .getService('User')
            .getByLoginAndPass({login, pass})
            .then((user) => {
                if (user) {
                    res.json({ status: 'ok', result: user });
                } else {
                    throw new Error('No user with such login/pass')
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(401);
                res.json({status: 'error', error: {message: error.message}})
            });
    }
}
