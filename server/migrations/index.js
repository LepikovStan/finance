const mysql = require('mysql');
const fs = require('fs');
const config = require('../config');
const db = mysql.createConnection(config.db);
let schema = fs.readFileSync(`${__dirname}/schema.sql`)
db.connect();

let queries = schema.toString().split(';');
queries.pop();

let promises = queries.map((query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, rows, fields) => {
            if (err) reject(err);
            resolve()
        });
    })
})

Promise
    .all(promises)
    .then(() => {
        console.log('done');
        process.exit();
    });
