const sequelize = require('../../config/sequelize')
require('./user');
require('./trash');

function initializeModels(){
    console.log("Initialize Sequelize -->")
    sequelize.sync({
        force: true
    })
    .then( async res => console.log("DATABASE CONNECTED SUCCESSFULLY!"))
    .catch(err => console.log("DATABASE NOT CONNECTED! :: ",err));
}

module.exports = initializeModels;