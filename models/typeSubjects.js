const dbSchool = require('../db');
const typeSubjects = {};

typeSubjects.getTypeSubjects = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [listTypeSubjects] = await connection.raw(`
            SELECT
                sts.*
            FROM sys_type_subjects AS sts
            ORDER BY sts.id
        `);

        result(null, listTypeSubjects)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getTypeSubjects')
        await dbSchool.closeConnection();
    }
}

module.exports = typeSubjects;