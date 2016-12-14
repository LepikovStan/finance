let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    delete(req, res) {
        let {categoryId} = req.params;
        categoryId = Number(categoryId);

        if (isNaN(categoryId)) {
            let error = new TypeError('There is wrong type of categoryId to delete it')
            return res.json({ status: 'error', message: error.message });
        }

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
        let {categoryId} = req.params

        if (categoryId !== 'new') {
            let error = new TypeError('There is wrong type of categoryId to create it')
            return res.json({ status: 'error', message: error.message });
        }

        let category = {name: req.body.categoryName, income: true, outgo: true};

        this
            .getService('Categories')
            .add(category)
            .then((category) => {
                res.json({ status: 'ok', result: category });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    put(req, res) {
        let {categoryId} = req.params;
        categoryId = Number(categoryId);

        if (isNaN(categoryId)) {
            let error = new TypeError('There is wrong type of categoryId to change it')
            return res.json({ status: 'error', message: error.message });
        }

        let category = req.body.category

        if (!category.id) {
            let error = new ReferenceError('Parameter `id` is mandatory for changing category');
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
