const dbSchool = require('../db');
const courses = {};

courses.getCourses = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const listCourse = await connection('sys_courses as sc')
        .select(
            'sg.id as id_grade',
            'sg.code_grade',
            'sg.name as name_grade',
            'sc.*'
        )
        .innerJoin('sys_grades as sg', 'sg.id', 'sc.sys_grade_id')
        .whereNull('sc.deleted_at')
        .whereNull('sg.deleted_at')
        .orderBy('sc.id');

        result(null, listCourse)
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

courses.create = async (course, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const { name, code_course, sys_grade_id } = course;

        const createCourse = await connection('sys_courses')
        .insert({
            name: name,
            code_course: code_course,
            sys_grade_id: sys_grade_id
        })

        result(null, createCourse[0]);
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
        const { id, code_course, name, sys_grade_id } = course;

        const updateCourse = await connection('sys_courses')
        .where('id', id)
        .update({
            code_course: code_course,
            name: name,
            sys_grade_id: sys_grade_id,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })

        result(null, updateCourse.insertId);
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

courses.delete = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const deleteGrade = await connection('sys_courses')
        .where('id', id)
        .update({
            deleted_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })

        result(null, id);
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

module.exports = courses;