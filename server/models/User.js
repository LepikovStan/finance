let Model = require('../lib/model');

class NewModel extends Model {
    updateSid(params) {
        return this.query(
            `update users set sid=:sid where id=:id`,
            params
        );
    }

    add(params) {
        return this.query(
            `insert into users (updatedAt, s, p, l, sid) values (:updatedAt, :salt, :pass, :login, :sid)`,
            params
        );
    }

    getByLogin(params) {
        return this.query(
            `select id, p as pass, l as login, s as salt, sid from users where l=:login`,
            params
        );
    }

    getBySid(params) {
        return this.query(
            `select id, p as pass, l as login, s as salt, sid from users where sid=:sid`,
            params
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
