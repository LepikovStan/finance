let Service = require('../lib/service');

class Categories extends Service {
    getAll() {
        return  [
            {id: 2, name: 'Cat 1', income: true, outgo: true},
            {id: 4, name: 'Cat 2', income: false, outgo: true},
            {id: 5, name: 'Cat 3', income: true, outgo: false}
        ]
    }
};

module.exports = (app) => {
    return new Categories(app);
}
