const dbSchool = require('../db');
const teachers = {};

teachers.getTeachers = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listCourse] = await connection.raw(`
            SELECT 
                upi.id AS id_grade,
                upi.name,
                upi.lastname,
                upi.type_document,
                upi.document_number,
                upi.gender,
                upi.phone
            FROM sys_teachers AS st
            JOIN user_personal_info upi ON st.user_personal_info_id = upi.id
            WHERE st.deleted_at IS NULL AND st.deleted_at IS NULL
            ORDER BY st.id
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

teachers.create = async (teacher, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const { sys_subjects_teachers, sys_courses_teachers } = teacher;
        
        typesubjects_ids.forEach(async (sys_type_subjects_id) => {
            const [addTeachers] = await connection.raw(`
                INSERT INTO sys_teachers(
                    user_personal_info_id
                )VALUES(
                    '${teacher.user_personal_info_id}'
                )
            `)
            
            sys_subjects_teachers.forEach(async (sys_subjects_teachers_id) => {
                const [addSubjectsTeachers] = await connection.raw(`
                    INSERT INTO sys_subjects_teachers(
                        sys_teachers_id,
                        sys_courses_teachers_id
                    )VALUES(
                        '${addTeachers.insertId}',
                        '${sys_subjects_teachers_id}'
                    )
                `)
            });

            sys_courses_teachers.forEach(async (sys_courses_teachers_id) => {
                const [addCoursesTeachers] = await connection.raw(`
                    INSERT INTO sys_courses_teachers(
                        sys_teachers_id,
                        sys_grades_subjets_id
                    )VALUES(
                        '${addTeachers.insertId}',
                        '${sys_courses_teachers_id}'
                    )
                `)
            });
        });

        result(null, true);
    } catch (error) {
        console.error('Error fetching subject from tenant database', error);
        result(error, null);
    }finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Subjects delete')
        await dbSchool.closeConnection();
    }
}

module.exports = teachers;