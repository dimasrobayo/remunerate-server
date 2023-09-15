const dbSchool = require('../db');
const grades = {};

grades.getGrades = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listGrades] = await connection.execute(`
            SELECT 
                tt.id AS id_type_teaching,
                tt.codigo AS code_type_teaching,
                tt.name as name_type_teaching,
                g.*
            FROM sys_grades AS g
            JOIN sys_types_teachings tt ON tt.id = g.sys_type_teaching_id
            WHERE g.deleted_at IS NULL AND tt.status = 'ACTIVO'
            ORDER BY g.id
        `);

        result(null, listGrades)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

grades.create = async (grade, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [createGrade] = await connection.execute(`
            INSERT INTO sys_grades(
                code_grade,
                name,
                sys_type_teaching_id
            )VALUES(
                '${grade.code_grade}',
                '${grade.name}',
                '${grade.sys_type_teaching_id}'
            )
        `)

        result(null, createGrade.insertId);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

grades.update = async (grade, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [updateGrade] = await connection.execute(`
            UPDATE sys_grades
            SET
                code_grade  = '${grade.code_grade}',
                name = '${grade.name}',
                sys_type_teaching_id = '${grade.sys_type_teaching_id}',
                updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
            WHERE
                id = ${grade.id}
        `)
        result(null, updateGrade.insertId);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

grades.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [deleteGrade] = await connection.execute(`
            UPDATE sys_grades
            SET
                deleted_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
            WHERE
                id = ${id}
        `)
        result(null, id);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

module.exports = grades;