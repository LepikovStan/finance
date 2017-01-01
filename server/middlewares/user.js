const session = require('express-session');

module.exports = (app) => {
    return (req, res, next) => {
        console.log('session', req.session)
        app.db.query(`select id, p as pass, l as login, s as salt, sid from users where sid='${req.session.id}'`, (err, rows) => {
            user = rows[0];
            req.user = user
            next();
        });
    }
}
