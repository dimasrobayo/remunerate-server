const dbSchool = require('../db');
const comunity = {};
const tableName = 'sys_community';


comunity.getCommunityByparams = async (params,connection_trx) => {
    const connection = connection_trx;
    try {
        const [sys_comunity] = await connection.select('*').from(tableName).where(params);
        return sys_comunity ? sys_comunity : false
    } catch (error) {
        console.error('Error fetching comunity from tenant database', error);
        return null;
    }

}



module.exports = comunity;