const dbSchool = require('../db');
const user_addresses = {};
const tableName = 'user_addresses';



user_addresses.create = async (user_address,sys_community_id,connection_trx) => {
    //const connection = await dbSchool.getConnection();
    const connection = connection_trx;
    try {
        const [user_addresses] = await connection.raw(`
            INSERT INTO
            ${tableName}(
                address,
                codigo_postal,
                department_number,
                sys_community_id
            ) VALUES (
                '${user_address.address}', 
                '${user_address.codigo_postal}', 
                '${user_address.department_number}',
                '${sys_community_id}'
             
            )`);

        return user_addresses.insertId;
    } catch (error) {
        console.error('Error fetching user_addresses from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de user_addresses create')
        //await dbSchool.closeConnection();
    }
}

module.exports = user_addresses;