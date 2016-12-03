const mysql = require('mysql');
const fs = require('fs');
const config = require('../config');
const db = mysql.createConnection(config.db);
let schema = fs.readFileSync(`${__dirname}/schema.sql`)
db.connect();

queries = schema.toString().split(';');
queries.pop();

queries.map((query) => {
    db.query(query, (err, rows, fields) => {
        if (err) throw err;
    });
});
