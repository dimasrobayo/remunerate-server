const dbSchool = require('../db');
const user_civilian_information = {};
const tableName = 'user_civilian_information';




user_civilian_information.create = async (user,user_personal_info_id,connection) => {
    //const connection = await dbSchool.getConnection();
    console.log(user)
    console.log("000000000000000")
    console.log(user_personal_info_id)
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