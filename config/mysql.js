require('dotenv').config();

const mysql = require('mysql2');

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DB_NAME = process.env.MYSQL_DATABASE;

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB_NAME
});

module.exports = pool.promise();