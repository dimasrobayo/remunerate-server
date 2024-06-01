const dbSchool = require('../db');
const courses = {};

courses.getCourses = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [listCourse] = await connection.raw(`
            SELECT 
                sg.id AS id_grade,
                sg.code_grade,
                sg.name as name_grade,
                sc.*
            FROM sys_courses AS sc
            JOIN sys_grades sg ON sg.id = sc.sys_grade_id
            WHERE sc.deleted_at IS NULL AND sg.deleted_at IS NULL
            ORDER BY sc.id
        `);

        result(null, listCourse)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getCourses')
        await dbSchool.closeConnection();
    }
}

courses.create = async (course, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [createCourse] = await connection.raw(`
            INSERT INTO sys_courses(
                name,
                code_course,
                sys_grade_id
            )VALUES(
                '${course.name}',
                '${course.code_course}',
                '${course.sys_grade_id}'
            )
        `)

        result(null, createCourse.insertId);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Courses create')
        await dbSchool.closeConnection();
    }
}

courses.update = async (course, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [updateCourse] = await connection.raw(`
            UPDATE sys_courses
            SET
                code_course  = '${course.code_course}',
                name = '${course.name}',
                sys_grade_id = '${course.sys_grade_id}',
                updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
            WHERE
                id = ${course.id}
        `)
        result(null, updateCourse.insertId);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Courses update')
        await dbSchool.closeConnection();
    }
}

courses.delete = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [deleteGrade] = await connection.raw(`
            UPDATE sys_courses
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
        console.log('Cierra la conexión después de Courses delete')
        await dbSchool.closeConnection();
    }
}

module.exports = courses;