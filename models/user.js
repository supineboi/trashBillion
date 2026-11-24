const fs = require("fs");
const path = require("path");
const Loggers = require("../utils/loggers");

module.exports = class User {
    static filePath = path.join(__dirname, "..", "data", "users.json");

    static initialize(){
        const isExist = fs.existsSync(this.filePath);

        if(!isExist){
            fs.writeFileSync(this.filePath, "[]");
        }
    }

    static create(user) {
        try {
            Loggers.error('user', 'create', "evoke")
            const users = this.read();
    
            users.push(user);
            
            fs.writeFileSync(
                this.filePath,
                JSON.stringify(users, null, 2)
            );
            Loggers.error('user', 'create', "end")
        } catch(err){
            Loggers.error('user', 'create', err)

        }
    }

    static read() {
        try {
            Loggers.info('user', 'read', "evoke")
            const users = JSON.parse(
                fs.readFileSync(this.filePath, "utf-8")
            )
            Loggers.info('user', 'read', "end")
            return users
        } catch(err) {
            Loggers.error('user', 'read', err)
        }
    }
};