const session = require('express-session');

module.exports = (app) => {
    return (req, res, next) => {
        console.log('session', req.session, req.session.id, req.path)
        app.db.query('select * from users limit 1', (err, rows) => {
            user = rows[0].id;
            user.name = "User";
            req.user = user
            next();
        });
    }
}
