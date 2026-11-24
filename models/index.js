const fs = require('fs');
const path = require('path');
const User = require('./user');
const Trash = require('./trash');

function initializeModels(){
    fs.mkdirSync(path.join(__dirname, "..", "data"), {recursive: true})

    User.initialize();
    Trash.initialize();

}

module.exports = initializeModels;