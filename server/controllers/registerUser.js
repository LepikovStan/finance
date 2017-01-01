const Controller = require('../lib/controller');
const crypto = require('crypto');
const moment = require('moment');

module.exports = class extends Controller {

    post(req, res) {
        let {login, pass} = req.body,
            session = req.session,
            salt = crypto.randomBytes(24).toString('base64');

        let passHash = crypto.createHmac('sha384', salt)
            .update(pass)
            .digest('hex');

        let userData = {
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            login,
            pass: passHash,
            sid: session.id,
            salt
        }

        this
            .getService('User')
            .add(userData)
            .then((result) => {
                res.json({status: 'ok', result: {
                    id: result.insertId,
                    status: 'free'
                }})
            })
            .catch((error) => {
                console.error(error);
                res.status(400)
                res.json({status: 'error', error: {message: error.message}})
            })
    }

}
