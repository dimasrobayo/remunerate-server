const dbSchool = require('../db');
const user_social_information = {};
const tableName = 'user_social_information';


user_social_information.getByUserPersonalinfoId = async (user_personal_info_id,connection_trx) => {
    //const connection = await dbSchool.getConnection();
    const connection = connection_trx;
    
    try {
        const [user_social] = await connection.select('*').from(tableName).where('user_personal_info_id', user_personal_info_id)
        return user_social;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de user_social_information')
        //await dbSchool.closeConnection();
    }
}

user_social_information.create = async (user_social,user_personal_info_id,connection_trx) => {
    //const connection = await dbSchool.getConnection();
    const connection = connection_trx;
    try {
        const [user_social_information] = await connection.raw(`
            INSERT INTO
            user_social_information(
                user_personal_info_id,
                email,
                phone
            ) VALUES (
                ${user_personal_info_id}, 
                '${user_social.email}', 
                '${user_social.phone}'
             
            )`);
        //console.log(user_social_information)
        return user_social_information.insertId;
    } catch (error) {
        console.error('Error fetching user_social_information from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de user_social_information create')
        //await dbSchool.closeConnection();
    }
}

module.exports = user_social_information;