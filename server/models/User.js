let Model = require('../lib/model');

class NewModel extends Model {
    updateSid(params) {
        return this.query(
            `update users set sid='${params.sid}' where id=${params.id}`
        );
    }

    add(params) {
        return this.query(
            `insert into users (updatedAt, s, p, l, sid) values ('${params.updatedAt}', '${params.salt}', '${params.pass}', '${params.login}', '${params.sid}')`
        );
    }

    getByLogin(params) {
        return this.query(
            `select id, p as pass, l as login, s as salt, sid from users where l='${params.login}'`
        );
    }

    getBySid(params) {
        return this.query(
            `select id, p as pass, l as login, s as salt, sid from users where sid='${params.sid}'`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
