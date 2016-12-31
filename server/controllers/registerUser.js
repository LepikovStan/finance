const Controller = require('../lib/controller');
const crypto = require('crypto');
const moment = require('moment');

module.exports = class extends Controller {

    post(req, res) {
        let {login, pass} = req.body,
            session = req.session,
            salt = '1';

        let passHash = crypto.createHmac('sha384', salt)
            .update(pass)
            .digest('hex');

        let user = {
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            login,
            pass: passHash,
            sid: session.id,
            salt
        }

        this
            .getService('User')
            .add(user)
            .then(() => {
                res.json({status: 'ok', result: user})
            })
            .catch((error) => {
                console.error(error);
                res.json({status: 'error', error: {message: error.message}})
            })
    }

}
