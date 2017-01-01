let Service = require('../lib/service');

class NewService extends Service {
    getAll(userId) {
        return this
            .getModel('Categories')
            .getAll({userId});
    }

    getAllByTypes(userId) {
        return new Promise((resolve, reject) => {
            Promise.all([
                    this.getModel('Categories').getIncome({userId}),
                    this.getModel('Categories').getOutgo({userId}),
                    this.getModel('Categories').getOutOfCategory()
                ])
                .then(([incomeCategories, outgoCategories,outOfCategory]) => {
                    incomeCategories.unshift(outOfCategory[0])
                    outgoCategories.unshift(outOfCategory[0])
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
