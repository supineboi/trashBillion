const User = require('./user');
const Trash = require('./trash');
const db = require('../../config/mysql')

function initializeModels(){
    db.execute(`
        CREATE DATABASE IF NOT EXISTS trashBillion   
    `)
    

    User.initialize();
    Trash.initialize();

}

module.exports = initializeModels;