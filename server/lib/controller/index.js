let Service = require('../service');

module.exports = class extends Service {
    all(req, res, next) {
        next()
    }

    get(req, res, next) {
        return res
            .status(404)
            .send({ status: 'fail', message: 'not found such method' });
    }

    post(req, res, next) {
        return res
            .status(404)
            .send({ status: 'fail', message: 'not found such method' });
    }

    put(req, res, next) {
        return res
            .status(404)
            .send({ status: 'fail', message: 'not found such method' });
    }

    delete(req, res, next) {
        return res
            .status(404)
            .send({ status: 'fail', message: 'not found such method' });
    }
};
