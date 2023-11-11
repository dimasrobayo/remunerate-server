const dbSchool = require('../db');
const typeSubjects = {};

typeSubjects.getTypeSubjects = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listTypeSubjects] = await connection.execute(`
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
}

module.exports = typeSubjects;