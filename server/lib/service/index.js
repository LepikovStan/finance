module.exports = class {
    constructor(app) {
        this.app = app;
    }

    getService(serviceName) {
        if (this.app[serviceName]) {
            return this.app[serviceName];
        } else {
            throw new ReferenceError(`There is no service with name=${serviceName}`);
        }
    }
};
