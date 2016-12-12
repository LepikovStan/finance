let Model = require('../lib/model');

class Categories extends Model {
    getAll() {
        return this.query(
            'select * from categories where id != 1;'
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
    return new Categories(app);
}
