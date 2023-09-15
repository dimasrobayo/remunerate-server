const dbSchool = require('../db');
const courses = {};

courses.getCourses = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listCourse] = await connection.execute(`
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
}

courses.create = async (course, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [createCourse] = await connection.execute(`
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
}

courses.update = async (course, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [updateCourse] = await connection.execute(`
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
}

courses.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [deleteGrade] = await connection.execute(`
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
}

module.exports = courses;