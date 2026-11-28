const Loggers = require("../../utils/loggers");
const db = require('../../config/mysql')

module.exports = class Trash {
    static initialize(){
        db.execute(`
            CREATE TABLE IF NOT EXISTS trash (
                id INT PRIMARY KEY,
                category VARCHAR(100) NOT NULL,
                title VARCHAR(255) NOT NULL,
                icon VARCHAR(20),
                description TEXT,
                quantity DECIMAL(10, 2) NOT NULL,
                unit VARCHAR(20) NOT NULL,
                location VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
    }

    static async create(trash) {
        try {
            Loggers.error('trash', 'create', "evoke")
            await db.execute(`
                INSERT INTO trash (
                    id,
                    category,
                    title,
                    icon,
                    description,
                    quantity,
                    unit,
                    location,
                    phone
                )
                VALUES (?,?,?,?,?,?,?,?,?);
            `, [
                trash.id,
                trash.category,
                trash.title,
                trash.icon,
                trash.description,
                trash.quantity,
                trash.unit,
                trash.location,
                trash.phone
            ])
            Loggers.error('trash', 'create', "end")
        } catch(err){
            Loggers.error('trash', 'create', err)
        }
    }

    static async readAll() {
        try {
            Loggers.info('trash', 'readAll', "evoke")
            const [trashes, fieldData] = await db.execute(`
                SELECT * FROM trash
            `)
            Loggers.info('trash', 'readAll', "end")
            return trashes
        } catch(err) {
            Loggers.error('trash', 'readAll', err)
        }
    }
    
    static async read(id){
        try {
            Loggers.info('trash', 'read', 'evoke')
            const [trash, fieldData] = await db.execute(`
                SELECT * FROM trash WHERE id = ?
            `, [id])
            return trash;
        } catch(err){
            Loggers.error('trash', 'read', err)
        }
    }
};