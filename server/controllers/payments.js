let Controller = require('../lib/controller');
let fs = require('fs');
let _ = require('lodash');
let query = require('lodash');

module.exports = class extends Controller {
    get(req, res) {
        let type = _.get(req, 'params.type') || 'list';
        let query = _.get(req, 'query');
        let filter = _.get(query, 'filter');
        let payments;

        if (type === 'last') {
            payments = [
                {"id":10,"time": 1479600000000, "category": "Еда", "summ": -1500, "currency": "RUR"},
                {"id":7,"time": 1479427200000, "category": "Еда", "summ": -1000, "currency": "RUR"},
                {"id":8,"time": 1479168000000, "category": "Интернет", "summ": -450, "currency": "RUR"},
                {"id":5,"time": 1479168000000, "category": "Зарплата", "summ": 20000, "currency": "RUR"},
                {"id":4,"time": 1478908800000, "category": "Обед", "summ": -250, "currency": "RUR"},
                {"id":2, "time": 1478649600000, "category": "Авто", "summ": -1000, "currency": "RUR"}
            ]
            if (filter) {
                payments = _.slice(payments, 0, filter);
            }
        }
        if (type === 'future') {
            payments = [
                {"id":12,"time": 1480550400000, "category": "Авто", "summ": -500, "currency": "RUR"},
                {"id":13,"time": 1480896000000, "category": "Зарплата", "summ": 30000, "currency": "RUR"},
                {"id":14,"time": 1480896000000, "category": "Долг", "summ": 5000, "currency": "RUR"},
                {"id":16,"time": 1481328000000, "category": "Долг", "summ": -1000, "currency": "RUR"},
                {"id":20,"time": 1481414400000, "category": "Еда", "summ": -500, "currency": "RUR"},
                {"id":21,"time": 1481760000000, "category": "Интернет", "summ": -450, "currency": "RUR"}
            ]
            payments = _.slice(payments, 0, filter);
        }
        if (type === 'list') {
            payments = [
                {"id":2, "time": 1478649600000, "category": "Авто", "summ": -1000, "currency": "RUR"},
                {"id":3,"time": 1478822400000, "category": "Авто", "summ": -2000, "currency": "RUR"},
                {"id":4,"time": 1478908800000, "category": "Обед", "summ": -250, "currency": "RUR"},
                {"id":5,"time": 1479168000000, "category": "Зарплата", "summ": 20000, "currency": "RUR"},
                {"id":8,"time": 1479168000000, "category": "Интернет", "summ": -450, "currency": "RUR"},
                {"id":7,"time": 1479427200000, "category": "Еда", "summ": -1000, "currency": "RUR"},
                {"id":10,"time": 1479600000000, "category": "Еда", "summ": -1500, "currency": "RUR"},

                {"id":12,"time": 1480550400000, "category": "Авто", "summ": -500, "currency": "RUR"},
                {"id":13,"time": 1480896000000, "category": "Зарплата", "summ": 30000, "currency": "RUR"},
                {"id":14,"time": 1480896000000, "category": "Долг", "summ": 5000, "currency": "RUR"},
                {"id":16,"time": 1481328000000, "category": "Долг", "summ": -1000, "currency": "RUR"},
                {"id":20,"time": 1481414400000, "category": "Еда", "summ": -500, "currency": "RUR"},
                {"id":21,"time": 1481760000000, "category": "Интернет", "summ": -450, "currency": "RUR"}
            ]
        }

        res.json({
            status: 'ok',
            result: payments
        });
    }
}
