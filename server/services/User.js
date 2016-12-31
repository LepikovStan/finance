const Service = require('../lib/service');
const _ = require ('lodash');
const crypto = require('crypto');

class NewService extends Service {

    add(user) {
        return this.getModel('User')
                .add(user)
    }

    getByLogin(login) {
        return new Promise((resolve, reject) => {
            this.getModel('User')
                .getByLogin(login)
                .then((users) => {
                    user = users[0];
                    if (user) {
                        resolve(user)
                    } else {
                        reject(new Error('wrong login/password'));
                    }
                })
        })
    }

    checkPassword(user, pass) {
        console.log(user, pass)
        let {salt, pass} = user,
            passHash = crypto.createHmac('sha384', '1')
                .update(pass)
                .digest('hex');

        console.log('user', salt, pass)
        if (pass === passHash) {
            return user;
        } else {
            throw new Error('wrong login/password')
        }
    }

};

module.exports = (app) => {
    return new NewService(app)
}
