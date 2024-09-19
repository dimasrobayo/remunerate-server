// middleware/tenantDbMiddleware.js
require('dotenv').config();
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../config/knexfile');
const helmet = require('helmet');

// Crear un knex instance para la base de datos de tenants
const tenantsDb = Knex(knexConfig.development);

// Middleware para la conexión de base de datos del tenant
const getTenantDatabaseConnection = async (req, res, next) => {
  const domain = req.header('origin');
  if (!domain) {
    return res.status(400).send('Falta el header "domain".');
  }

  try {
    const tenant = await tenantsDb('tenants').where({ domain }).first();
    if (!tenant) {
      return res.status(404).send('Dominio no encontrado.');
    }

    // Configurar conexión a la base de datos del tenant
    req.db = Knex({
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: tenant.database_name // Nombre de la base de datos del tenant
      }
    });

    // Da acceso a Objection para usar la conexión de la base de datos del tenant
    Model.knex(req.db);

    // Asegurar que la conexión se cierre cuando la respuesta termine
    res.on('finish', () => {
      if (req.db) {
        console.log('Destroying connection...')
        req.db.destroy();
      }
    });

    // GET TO INFO THE TENANT
    req.dbInfo = {
        domain: domain,
        dbSchool_name: tenant.database_name,
        rut_tenant: tenant.rut,
        date_start: tenant.date_start,
        date_end: tenant.date_end
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor.');
  }
};

module.exports = {
  getTenantDatabaseConnection,
  helmet
};
