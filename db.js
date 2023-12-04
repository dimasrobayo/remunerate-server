require('dotenv').config();

const knex = require('knex');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect(dbSchoolName) {
    this.connection = knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: dbSchoolName,
      },
    });
  }

  async getConnection() {
    if (!this.connection) {
      throw new Error('Database connection not initialized.');
    }
    return this.connection;
  }

  async closeConnection() {
    if (this.connection) {
      await this.connection.destroy();
      this.connection = null;
    }
  }
}

const database = new Database();
module.exports = database;
