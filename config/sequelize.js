require('dotenv').config();

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DB_NAME = process.env.MYSQL_DATABASE;

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    DB_NAME,
    USER,
    PASSWORD, 
    {
        dialect: 'mysql',
        host: HOST,
        logging: false
    }
    
);


module.exports = sequelize;