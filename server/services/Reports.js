let Service = require('../lib/service');

class NewService extends Service {

    prepareForReport(data) {
        let result = {
            categories: [],
            series: []
        }
        data.map((item) => {
            result.categories.push(item.categoryName);
            result.series.push(item.amount);
        })

        return result;
    }

    getCategories(payment) {
        return new Promise((resolve, reject) => {
            this
                .getModel('Reports')
                .getCategories()
                .then((data) => {
                    resolve(data)
                })
        })
    }
};

module.exports = (app) => {
    return new NewService(app)
}
