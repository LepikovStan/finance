let Model = require('../lib/model');

class NewModel extends Model {
    getAll(params) {
        return this.query(
            `select * from categories where id != 0 and user_id=:userId;`,
            params
        );
    }

    getIncome(params) {
        return this.query(
            `select * from categories where id != 0 and income = 1 and user_id=:userId;`,
            params
        );
    }

    getOutgo(params) {
        return this.query(
            `select * from categories where id != 0 and outgo = 1 and user_id=:userId;`,
            params
        );
    }

    getOutOfCategory() {
        return this.query(
            `select * from categories where id = 0;`
        );
    }

    getById(params) {
        if (Number(params.categoryId) === 0) {
            return this.query(
                `select * from categories where id=:categoryId`,
                params
            );
        } else {
            return this.query(
                `select * from categories where id=:categoryId and user_id=:userId`,
                params
            );
        }
    }

    add(params) {
        return this.query(
            `insert into categories
            (updatedAt, user_id, name, income, outgo)
            values(NOW(), :userId, :name, :income, :outgo);`,
            params
        );
    }

    delete(params) {
        return this.query(
            `delete from categories where id=:id and user_id=:userId`,
            params
        );
    }

    change(params) {
        return this.query(
            `update categories
            set name=:name, income=:income, outgo=:outgo
            where id=:id
            and user_id=:userId`,
            params
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
