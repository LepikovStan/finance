const Service = require('../service');

module.exports = class extends Service {
    query(query) {
        return new Promise((resolve, reject) => {
            this
                .getDb()
                .query(
                    query,
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    });
                
        });
    }
};
