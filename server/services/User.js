const Service = require('../lib/service');
const _ = require ('lodash');
const crypto = require('crypto');

class NewService extends Service {

    updateSid(sid, user) {
        return new Promise ((resolve, reject) => {
            this.getModel('User')
                .updateSid({sid, id: user.id})
                .then(() => {
                    resolve(user)
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    add(user) {
        return new Promise ((resolve, reject) => {
            this.getModel('User')
                .add(user)
                .then(resolve)
                .catch((error) => {
                    if (_.startsWith(error.message), 'ER_DUP_ENTRY') {
                        error = new Error(`Логин '${user.login}' уже занят`)
                    }
                    reject(error);
                })
        })
    }

    getByLogin(login) {
        return new Promise((resolve, reject) => {
            this.getModel('User')
                .getByLogin({login})
                .then((users) => {
                    if (!users.length) {
                        return reject(new Error('wrong login/password'));
                    }

                    let user = users[0];
                    if (user) {
                        resolve(user)
                    } else {
                        reject(new Error('wrong login/password'));
                    }
                })
        })
    }

    getBySid(sid) {
        return new Promise((resolve, reject) => {
            this.getModel('User')
                .getBySid({sid})
                .then((users) => {
                    if (!users.length) {
                        return reject(new Error('user no auth'));
                    }

                    let user = users[0];
                    if (user) {
                        resolve(user)
                    } else {
                        reject(new Error('user no auth'));
                    }
                })
        })
    }

    checkPassword(password, user) {
        let {salt, pass} = user,
            passHash = crypto.createHmac('sha384', salt)
                .update(password)
                .digest('hex');

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
