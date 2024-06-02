const dbSchool = require('../db');
const user_addresses_personal_info = {};
const tableName = 'user_addresses_personal_info';



user_addresses_personal_info.create = async (model,connection_trx) => {
    console.log(model)
    //const connection = await dbSchool.getConnection();
    const connection = connection_trx;
    try {

        // Verificar si el registro ya existe basado en document_number
        const [user_addresses_personal_info] =  await connection.raw(`
            INSERT INTO
            ${tableName}(
                id,
                address_id,
                user_personal_info_id,
                created_at,
                updated_at
            ) VALUES (
                NULL, 
                '${model.address_id}', 
                '${model.user_personal_info_id}',
                current_timestamp(), 
                current_timestamp()
             
            )`);

        
        return user_addresses_personal_info;
    } catch (error) {
        console.error('Error fetching user_addresses_personal_info from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de user_addresses_personal_info create')
        //await dbSchool.closeConnection();
    }
}

module.exports = user_addresses_personal_info;