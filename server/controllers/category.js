let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    delete(req, res) {
        let {categoryId} = req.params

        this
            .getService('Categories')
            .delete({id: categoryId})
            .then((result) => {
                res.json({ status: 'ok' });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    post(req, res) {
        this
            .getService('Categories')
            .add({name: req.body.categoryName, income: true, outgo: true})
            .then((category) => {
                res.json({ status: 'ok', result: category });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    put(req, res) {
        let category = req.body.category

        if (!category.id) {
            let error = new ReferenceError('Parameter id is mandatory for changing category');
            res.json({
                status: 'error',
                message: error.message
            });
            console.error(error)
            return
        }

        this
            .getService('Categories')
            .change(category)
            .then((result) => {
                res.json({ status: 'ok', result: req.body.category });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
