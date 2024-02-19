const dbSchool = require('../db');
const sys_teachers = {};
const tableName = 'sys_teachers';


sys_teachers.create = async (user_personal_info_id,connection_trx) => {
    //const connection = await dbSchool.getConnection();
    const connection = connection_trx;
    try {
        const [createSysTeacher] = await connection(tableName).insert(
            {
                user_personal_info_id: user_personal_info_id,
            }
        )
        return createSysTeacher;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de sys_teachers create')
        //await dbSchool.closeConnection();
    }
}

module.exports = sys_teachers;