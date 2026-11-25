require('dotenv').config();

const mysql = require('mysql2');

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB_NAME
});

module.exports = pool.promise();