let Model = require('../lib/model');

class NewModel extends Model {

    updateDeletedCategory(params) {
        return this.query(
            `update payments
            set category_id=0
            where user_id=:userId
            and category_id is null`,
            params
        );
    }

    change(params) {
        return this.query(
            `update payments
            set category_id=:categoryId, type=:type, amount=:amount, date=:date
            where id=:id
            and user_id=:userId`,
            params
        );
    }

    getAll(params) {
        return this.query(
            `select p.id, p.user_id, p.type as paymentType, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.user_id=19
            order by p.date desc`,
            params
        );
    }

    getLast(params) {
        return this.query(
            `select p.id, p.user_id, p.type as paymentType, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.date <= NOW()
            and p.user_id=:userId
            order by p.date desc`,
            params
        );
    }

    delete(params) {
        return this.query(
            `delete from payments where id=:id and user_id=:userId`,
            params
        );
    }

    getFuture(params) {
        return this.query(
            `select p.id, p.user_id, p.type as paymentType, p.amount, p.date, c.name as categoryName, c.id as categoryId
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.date > NOW()
            and p.user_id=:userId
            order by p.date asc`,
            params
        );
    }

    add(params) {
        return this.query(
            `insert into payments
            (updatedAt, user_id, category_id, type, amount, date)
            values(NOW(), :userId, :categoryId, :type, :amount, :date);`,
            params
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
