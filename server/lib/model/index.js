const Service = require('../service');

module.exports = class extends Service {
    query(query, params = {}) {
        // console.log(query, params);
        return new Promise((resolve, reject) => {
            this
                .getDb()
                .query(
                    query,
                    params,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    });

        });
    }
};
