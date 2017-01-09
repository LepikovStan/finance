let Model = require('../lib/model');

class NewModel extends Model {
    getAll(params) {
        return this.query(
            `select * from categories where id != 1 and user_id=${params.userId};`
        );
    }

    getIncome(params) {
        return this.query(
            `select * from categories where id != 1 and income = 1 and user_id=${params.userId};`
        );
    }

    getOutgo(params) {
        return this.query(
            `select * from categories where id != 1 and outgo = 1 and user_id=${params.userId};`
        );
    }

    getOutOfCategory() {
        return this.query(
            `select * from categories where id = 0;`
        );
    }

    getById(params) {
        if (Number(params.categoryId) === 1) {
            return this.query(
                `select * from categories where id=${params.categoryId}`
            );
        } else {
            return this.query(
                `select * from categories where id=${params.categoryId} and user_id=${params.userId}`
            );
        }
    }

    add(params) {
        return this.query(
            `insert into categories
            (updatedAt, user_id, name, income, outgo)
            values(NOW(), ${params.userId}, '${params.name}', ${params.income}, ${params.outgo});`
        );
    }

    delete(params) {
        return this.query(
            `delete from categories where id=${params.id} and user_id=${params.userId}`
        );
    }

    change(params) {
        return this.query(
            `update categories
            set name="${params.name}", income=${params.income}, outgo=${params.outgo}
            where id=${params.id}
            and user_id=${params.userId}`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
