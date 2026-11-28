const Loggers = require("../../utils/loggers");
const db = require('../../config/mysql')

module.exports = class User {
    static initialize(){
        db.execute(`
            CREATE TABLE IF NOT EXISTS 
                user (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    firstName VARCHAR(100) NOT NULL,
                    lastName VARCHAR(100) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
        `)
    }

    static async create(user) {
        try {
            Loggers.error('user', 'create', "evoke")
            await db.execute(`
                INSERT INTO user (
                    firstName, 
                    lastName, 
                    email, 
                    password
                ) VALUES (
                    ?,?,?,? 
                )    
            `, [
                user.firstName,
                user.lastName,
                user.email,
                user.password
            ])
            Loggers.error('user', 'create', "end")
        } catch(err){
            Loggers.error('user', 'create', err)

        }
    }

    static async readAll() {
        try {
            Loggers.info('user', 'readAll', "evoke")
            const [users, fieldData] = await db.execute(`
                SELECT * FROM user
            `)
            Loggers.info('user', 'readAll', "end")
            return users
        } catch(err) {
            Loggers.error('user', 'readAll', err)
        }
    }
    
    static async read(email){
        try {
            Loggers.info('user', 'read', "evoke")
            const [user, fieldData] = await db.execute(`
                SELECT * FROM user WHERE email = ?
            `, [email])
            Loggers.info('user', 'read', "end")
            return user?.[0]
        } catch(err) {
            Loggers.error('user', 'read', err)
        }
    }
};