let Model = require('../lib/model');

class NewModel extends Model {
    getByLoginAndPass(params) {
        return this.query(
            `select id, p as pass, l as login from users where p='${params.pass}' and l='${params.login}'`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
