const Controller = require('../lib/controller');
const fs = require('fs');
const _ = require('lodash');

let curr = [
    {},
    {sign: 'P', name: 'Российский рубль'},
    {sign: '$', name: 'Доллар США'},
    {sign: '€', name: 'Евро'},
    {sign: '£', name: 'Фунт стерлингов'},
    {sign: '₴', name: 'Украинская гривна'},
    {sign: 'MDL', name: 'Молдавский лей'},
    {sign: 'BYR', name: 'Белорусский рубль'},
    {sign: 'AZN', name: 'Азербайджанский манат'},
    {sign: 'AMD', name: 'Армянский драм'},
    {sign: 'т', name: 'Казахстанский тенге'},
    {sign: 'KGS', name: 'Киргизский сом'},
    {sign: 'TJS', name: 'Таджикский сомони'},
    {sign: 'UZS', name: 'Узбекский сум'},
    {sign: 'Ls', name: 'Латвийский лат'},
    {sign: 'Lt', name: 'Литовский лит'}
]

module.exports = class extends Controller {
    get(req, res) {
        this
            .getModel('Currency')
            .getAll()
            .then((currency) => {
                currency = currency.map((item) => {
                    if (curr[item.id]) {
                        item.sign = curr[item.id].sign
                        item.name = curr[item.id].name
                    }

                    return item;
                })
                res.json({
                    status: 'ok',
                    result: currency
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
