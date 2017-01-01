let Model = require('../lib/model');

class NewModel extends Model {

    getCategories(params) {
        return this.query(
            `select SUM(p.amount) as amount, c.name as categoryName
            from payments as p
            join categories as c
            on p.category_id = c.id
            where p.user_id = ${params.userId}
            group by c.name`
        );
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
