let Model = require('../lib/model');

class NewModel extends Model {
    getBalance() {
        return this.query(
            'select * from balance where user_id = 0'
        )
    }

    update(params) {
        return new Promise((resolve, reject) => {
            console.log(params,params.type === 'outgo',params.type);
            let updateBalanceQuery = '';

            if (params.type === 'outgo') {
                updateBalanceQuery = `select @balance:=@balance-${params.amount};`;
            } else {
                updateBalanceQuery = `select @balance:=@balance+${params.amount};`;
            }

            this.query('start transaction;')
                .then(this.query(`select @balance:=balance from balance limit 1`))
                .then(this.query(`select ifnull(@balance, @balance:=0);`))
                .then(this.query(updateBalanceQuery))
                .then(this.query(
                    `insert into balance (user_id, date, balance) values (0, "${params.date}", @balance) ON DUPLICATE KEY UPDATE balance = @balance;`
                ))
                .then(this.query('commit;'))
                .then(resolve)
        })
    }
};

module.exports = (app) => {
    return new NewModel(app);
}
