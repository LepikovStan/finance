let Model = require('../lib/model');

class NewModel extends Model {
    getAll() {
        return this.query(
            `select p.id, p.user_id, p.type as paymentType, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id`
        );
    }

    getLast() {
        return this.query(
            `select p.id, p.user_id, p.type, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.date <= NOW()
            order by p.date desc`
        );
    }

    delete(params) {
        return this.query(
            `delete from payments where id=${params.id}`
        );
    }

    getFuture() {
        return this.query(
            `select p.id, p.user_id, p.type, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.date > NOW()
            order by p.date asc`
        );
    }

    add(params) {
        return this.query(
            `insert into payments
            (updatedAt, user_id, category_id, type, amount, date)
            values(NOW(), 0, ${params.categoryId}, "${params.type}", ${params.amount}, DATE("${params.date}"));`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
