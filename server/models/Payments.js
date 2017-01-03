let Model = require('../lib/model');

class NewModel extends Model {

    change(params) {
        return this.query(
            `update payments
            set category_id=${params.categoryId}, type="${params.type}", amount=${params.amount}, date="${params.date}"
            where id=${params.id}
            and user_id=${params.userId}`
        );
    }

    getAll(params) {
        return this.query(
            `select p.id, p.user_id, p.type as paymentType, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.user_id=${params.userId}`
        );
    }

    getLast(params) {
        return this.query(
            `select p.id, p.user_id, p.type as paymentType, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.date <= NOW()
            and p.user_id=${params.userId}
            order by p.date desc`
        );
    }

    delete(params) {
        return this.query(
            `delete from payments where id=${params.id} and user_id=${params.userId}`
        );
    }

    getFuture(params) {
        return this.query(
            `select p.id, p.user_id, p.type as paymentType, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.date > NOW()
            and p.user_id=${params.userId}
            order by p.date asc`
        );
    }

    add(params) {
        return this.query(
            `insert into payments
            (updatedAt, user_id, category_id, type, amount, date)
            values(NOW(), ${params.userId}, ${params.categoryId}, "${params.type}", ${params.amount}, DATE("${params.date}"));`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
