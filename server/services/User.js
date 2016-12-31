let Service = require('../lib/service');
const _ = require ('lodash');

class NewService extends Service {

    getByLoginAndPass(params) {
        return new Promise((resolve, reject) => {
            this.getModel('User')
                .getByLoginAndPass(params)
                .then((users) => {
                    resolve(users[0])
                })
        })
    }

};

module.exports = (app) => {
    return new NewService(app)
}
