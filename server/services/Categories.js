let Service = require('../lib/service');

class NewService extends Service {
    getAll() {
        return this
            .getModel('Categories')
            .getAll();
    }

    getAllByTypes() {
        return new Promise((resolve, reject) => {
            Promise.all([
                    this.getModel('Categories').getIncome(),
                    this.getModel('Categories').getOutgo()
                ])
                .then(([incomeCategories, outgoCategories]) => {
                    resolve({
                        income: incomeCategories,
                        outgo: outgoCategories
                    })
                })
        });
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
    return new NewService(app)
}
