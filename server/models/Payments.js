let Model = require('../lib/model');

class Categories extends Model {
    getAll() {
        return this.query(
            'select * from payments;'
        );
    }
};

module.exports = (app) => {
    return new Categories(app);
}
