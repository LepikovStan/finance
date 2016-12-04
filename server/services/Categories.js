let Service = require('../lib/service');

class Categories extends Service {
    getAll() {
        return this
            .getModel('Categories')
            .getAll();
    }
};

module.exports = (app) => {
    return new Categories(app)
}
