const db = require('../db');

async function findTenantByDomain(domain) {
  const [rows] = await db.execute(`SELECT * FROM tenants WHERE domain = '${domain}'`);
  return rows.length === 0 ? null : rows[0];
}

module.exports = {
  findTenantByDomain,
};
