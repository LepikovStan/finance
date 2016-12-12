let Service = require('../lib/service');

class Categories extends Service {
    getAll() {
        return this
            .getModel('Categories')
            .getAll();
    }

    add(category) {
        return new Promise((resolve, reject) => {
            this
                .getModel('Categories')
                .add(category)
                .then((result) => {
                    category.id = result.insertId;
                    resolve(category);
                })
        });
    }

    delete(category) {
        return this
            .getModel('Categories')
            .delete(category)
    }

    change(category) {
        return new Promise((resolve, reject) => {
            this
                .getModel('Categories')
                .change(category)
                .then((result) => {
                    category.id = result.insertId;
                    resolve(category);
                })
        });
    }
};

module.exports = (app) => {
    return new Categories(app)
}
