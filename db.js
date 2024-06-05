const knex = require('knex');
const config = require('./utils/knexfile'); // Asegúrate de que el archivo knexfile.js esté configurado

let db;

module.exports = {
    connect(dbSchoolName) {
        db = knex({
            client: 'mysql2',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: dbSchoolName
            }
        });
    },
    getConnection() {
        if (!db) {
            throw new Error('Database not connected');
        }
        return db;
    },
    closeConnection() {
        if (db) {
            db.destroy();
            db = null;
        }
    }
};
