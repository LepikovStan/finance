const Controller = require('../lib/controller');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Controller {
    get(req, res) {
        let query = _.get(req, 'query');
        let {sort} = query

        if (sort === 'type') {
            return this
                .getService('Categories')
                .getAllByTypes()
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
            .getAll()
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
