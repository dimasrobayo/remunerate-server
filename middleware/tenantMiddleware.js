require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10
});

async function tenantMiddleware(request, response, next) {
    const domain = request.headers.origin;
    console.log(domain)
    
    try {
        const [rows] = await pool.execute(`SELECT * FROM tenants WHERE domain = '${domain}'`);

        if (rows.length === 0) {
        return response.status(404).json({ error: 'Tenant not found' });
        }

        const dbSchool_name = rows[0]['database_name'];

        // CONNECTION FOR TENANT
        const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: dbSchool_name,
    });
    
    // ATTACH THE CONNECTION TO REQUEST.DB
        request.db = connection;
    
        // GET TO INFO THE TENANT
        request.dbInfo = {
            domain: domain,
            dbSchool_name: dbSchool_name,
        };
    } catch (err) {
        console.error('Error on identify tenant', err);
        return response.status(500).json({ error: 'Error on server in Middleware' });
    }

    next();
}

module.exports = tenantMiddleware;