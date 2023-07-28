require('dotenv').config();
const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect(dbSchool_name) {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: dbSchool_name,
    });
  }

  async getConnection() {
    if (!this.connection) {
      throw new Error('Database connection not initialized.');
    }
    return this.connection;
  }
}

const database = new Database();
module.exports = database;
