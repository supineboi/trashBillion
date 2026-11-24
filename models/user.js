const fs = require("fs");
const path = require("path");

module.exports = class User {
    static filePath = path.join(__dirname, "..", "data", "users.json");

    static create(user) {
        const users = this.read();

        users.push(user);

        fs.writeFileSync(
            this.filePath,
            JSON.stringify(users, null, 2)
        );
    }

    static read() {
        return JSON.parse(
            fs.readFileSync(this.filePath, "utf-8")
        );
    }
};