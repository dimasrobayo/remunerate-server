const tenantModel = require('../models/tenantModel');

async function identifyTenant(req, res, next) {
  const domain = req.headers.host;

  try {
    const tenant = await tenantModel.findTenantByDomain(domain);

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const databaseName = tenant.database_name;
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'YourPassword',
      database: databaseName,
    });

    req.db = connection;
    next();
  } catch (err) {
    console.error('Error on identify tenant', err);
    return res.status(500).json({ error: 'Error on server in Middleware' });
  }
}

module.exports = {
  identifyTenant,
};
