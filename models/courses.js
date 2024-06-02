const dbSchool = require('../db');
const courses = {};
const tableName = 'sys_courses as sg';

courses.getCourses = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
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
        //console.log('Cierra la conexión después de getCourses')
        //await dbSchool.closeConnection();
    }
}

courses.getCoursesByparams = async (params,connection_trx) => {
    const connection = connection_trx;
    try {
        const [courses] = await  connection.select('*').from(tableName).where(params).whereNull('deleted_at');
        return courses;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }

}

courses.getCoursesByCodeGradeAndCourseName = async (params,connection_trx) => {
    const connection = connection_trx;
    
    try {
        const [listCourse] = await connection.raw(`
        SELECT 
            sg.id as grade_id,
            sg.code_grade,
            sg.name as grade_name,
            sc.id as curso_id,
            sc.name,
            sc.code_course
        FROM 
            sys_grades sg
        INNER JOIN 
            sys_courses sc
        ON 
            sg.id = sc.sys_grade_id
        INNER JOIN 
            sys_types_teachings stt
        ON 
            sg.sys_type_teaching_id = stt.id
        WHERE 
            sg.code_grade = '${params.code_grade}' 
            AND sc.letter_course LIKE '${params.letter_course}%'
            AND stt.codigo = '${params.cod_type_teacher}' 
        ORDER BY 
            sg.code_grade, sc.name;
        `);

        return listCourse.length ? listCourse : null
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de getCourses')
        //await dbSchool.closeConnection();
    }

}

courses.create = async (course, result) => {
    const connection = await dbSchool.getConnection();

    try {
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
    const connection = await dbSchool.getConnection();

    try {
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
    const connection = await dbSchool.getConnection();

    try {
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