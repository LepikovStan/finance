let Model = require('../lib/model');

class NewModel extends Model {
    getAll() {
        return this.query(
            'select * from categories where id != 1;'
        );
    }

    getById(category_id) {
        return this.query(
            `select * from categories where id=${category_id}`
        );
    }

    add(params) {
        return this.query(
            `insert into categories
            (updatedAt, user_id, name, income, outgo)
            values(NOW(), 0, "${params.name}", ${params.income}, ${params.outgo});`
        );
    }

    delete(params) {
        return this.query(
            `delete from categories where id=${params.id}`
        );
    }

    change(params) {
        return this.query(
            `update categories
            set name="${params.name}", income=${params.income}, outgo=${params.outgo}
            where id=${params.id}`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
