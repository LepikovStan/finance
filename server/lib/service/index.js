module.exports = class {
    constructor(app) {
        this.app = app;
    }

    getModel(modelName) {
        if (this.app.models[modelName]) {
            return this.app.models[modelName];
        } else {
            throw new ReferenceError(`There is no model with name=${modelName}`);
        }
    }

    getDb() {
        return this.app.db;
    }

    getService(serviceName) {
        if (this.app.services[serviceName]) {
            return this.app.services[serviceName];
        } else {
            throw new ReferenceError(`There is no service with name=${serviceName}`);
        }
    }
};
