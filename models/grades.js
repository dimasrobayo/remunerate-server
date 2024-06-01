const dbSchool = require('../db');
const grades = {};

grades.getGrades = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [listGrades] = await connection.raw(`
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
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getGrades')
        await dbSchool.closeConnection();
    }
}

grades.create = async (grade, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [createGrade] = await connection.raw(`
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
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de grades create')
        await dbSchool.closeConnection();
    }
}

grades.update = async (grade, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [updateGrade] = await connection.raw(`
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
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de update grades')
        await dbSchool.closeConnection();
    }
}

grades.delete = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [deleteGrade] = await connection.raw(`
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
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de delete grades')
        await dbSchool.closeConnection();
    }
}

module.exports = grades;