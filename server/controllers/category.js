let Controller = require('../lib/controller');
let fs = require('fs');

module.exports = class extends Controller {
    delete(req, res) {
        let {categoryId} = req.params;
        categoryId = Number(categoryId);
        const Payments = this.getService('Payments')

        if (isNaN(categoryId)) {
            let error = new TypeError('There is wrong type of categoryId to delete it')
            return res.json({ status: 'error', message: error.message });
        }

        this
            .getService('Categories')
            .delete({id: categoryId, userId: req.user.id})
            .then(Payments.updateDeletedCategory.bind(Payments, {userId: req.user.id}))
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

        let category = req.body.category;

        if (category.income === 'false') {
            category.income = false
        } else {
            category.income = true
        }

        if (category.outgo === 'false') {
            category.outgo = false
        } else {
            category.outgo = true
        }

        let categoryToInsert = {name: category.name, income: category.income, outgo: category.outgo, userId: req.user.id};

        this
            .getService('Categories')
            .add(categoryToInsert)
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
        category.income = category.income === 'true' ? true : false
        category.outgo = category.outgo === 'true' ? true : false

        if (!category.id) {
            let error = new ReferenceError('Parameter `id` is mandatory for changing category');
            res.json({
                status: 'error',
                message: error.message
            });
            console.error(error)
            return
        }
        category.userId = req.user.id

        this
            .getService('Categories')
            .change(category)
            .then((result) => {
                res.json({ status: 'ok', result: category });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
