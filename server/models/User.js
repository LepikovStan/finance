let Model = require('../lib/model');

class NewModel extends Model {
    add(params) {
        return this.query(
            `insert into users (updatedAt, s, p, l, sid) values ('${params.updatedAt}', '${params.salt}', '${params.pass}', '${params.login}', '${params.sid}')`
        );
    }

    getByLogin(login) {
        return this.query(
            `select id, p as pass, l as login, s as salt, sid from users where l='${login}'`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
