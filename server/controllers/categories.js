const Controller = require('../lib/controller');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Controller {
    get(req, res) {
        let {query, user} = req
        let {sort} = query

        if (sort === 'type') {
            return this
                .getService('Categories')
                .getAllByTypes(user.id)
                .then((categories) => {
                    res.json({
                        status: 'ok',
                        result: categories
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        this
            .getService('Categories')
            .getAll(user.id)
            .then((categories) => {
                res.json({
                    status: 'ok',
                    result: categories
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
