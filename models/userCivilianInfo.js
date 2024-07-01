const dbSchool = require('../db');
const user_civilian_information = {};
const tableName = 'user_civilian_information';



user_civilian_information.getBy = async (params,connection_trx) => {
    //const connection = await dbSchool.getConnection();
    const connection = connection_trx;
    
    try {
        const [sysFile] = await connection.select('*').from(tableName).where(params)
        return sysFile;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de user_personal_info')
        //await dbSchool.closeConnection();
    }
}

user_civilian_information.create = async (user,user_personal_info_id,connection_trx) => {
    const connection = connection_trx;
    
    try {
        const [createPersonalCivilianId] = await connection(tableName).insert(
            {
                user_personal_info_id: user_personal_info_id,
                birthdate: user.birthdate,
                country_birth: user.country_birth,
                nationality:user.nationality,
                observaciones: user.observaciones,
            }
        )
        return createPersonalCivilianId;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de user_civilian_information create')
        //await dbSchool.closeConnection();
    }
}

module.exports = user_civilian_information;