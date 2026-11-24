const fs = require("fs");
const path = require("path");
const Loggers = require("../utils/loggers");

module.exports = class Trash {
    static filePath = path.join(__dirname, "..", "data", "trashes.json");

    static initialize(){
        const isExist = fs.existsSync(this.filePath);

        if(!isExist){
            fs.writeFileSync(this.filePath, "[]");
        }
    }

    static create(user) {
        try {
            Loggers.error('trash', 'create', "evoke")
            const trashes = this.readAll();
    
            trashes.push(user);
            
            fs.writeFileSync(
                this.filePath,
                JSON.stringify(trashes, null, 2)
            );
            Loggers.error('trash', 'create', "end")
        } catch(err){
            Loggers.error('trash', 'create', err)

        }
    }

    static readAll() {
        try {
            Loggers.info('trash', 'readAll', "evoke")
            const trashes = JSON.parse(
                fs.readFileSync(this.filePath, "utf-8")
            )
            Loggers.info('trash', 'readAll', "end")
            return trashes
        } catch(err) {
            Loggers.error('trash', 'readAll', err)
        }
    }
    
    static read(id){
        try {
            Loggers.info('trash', 'read', 'evoke')
            const trashes = this.readAll();
            const trash = trashes.find( trash => trash.id === id);
            return trash;
        } catch(err){
            Loggers.error('trash', 'readA', err)
        }
    }
};