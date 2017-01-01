let Controller = require('../lib/controller');

module.exports = class extends Controller {

    get(req, res) {
        this.getService('User')
            .getBySid(req.session.id)
            .then((user) => {
                res.json({status: 'ok', result: {id:user.id, status: 'free'}})
            })
            .catch((error) => {
                res.status(401)
                    .json({status: 'error', error: {message: error.message}})
            })
    }

    post(req, res) {
        let {login, pass} = req.body;
        const User = this.getService('User');
        // req.session.regenerate()

        User
            .getByLogin(login)
            .then(User.checkPassword.bind(User, pass))
            .then(User.updateSid.bind(User, req.session.id))
            .then((user) => {
                if (user) {
                    res.json({status: 'ok', result: {
                        id: user.id,
                        status: 'free'
                    }})
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
