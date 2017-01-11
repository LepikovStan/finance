let Model = require('../lib/model');

class NewModel extends Model {
    getAll() {
        return this.query(
            `select * from currency`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
