let Controller = require('../lib/controller');

module.exports = class extends Controller {

    post(req, res) {
        let {login, pass} = req.body;
        const User = this.getService('User');

        User
            .getByLogin(login)
            .then(User.checkPassword.bind(User, pass))
            .then((user) => {
                if (user) {
                    res.json({status: 'ok', result: user})
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
