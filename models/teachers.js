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
                usi.email,
                uci.birthdate,
                upi.phone,
                upi.image
            FROM sys_teachers AS st
            JOIN user_personal_info upi ON st.user_personal_info_id = upi.id
            JOIN user_social_information usi ON usi.user_personal_info_id = upi.id
            JOIN user_civilian_information uci ON uci.user_personal_info_id = upi.id
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
    const {coursesSelected} = teacher

    try {
        // SE REALIZA EL INSERT O UPDATE DEL DOCENTE DE DATOS PERSONALES.
        const [user_personal_info] = await connection.raw(`
            INSERT INTO
            user_personal_info(
                name,
                lastname,
                mother_lastname,
                type_document,
                document_number,
                gender,
                phone
            )VALUES(
                '${teacher.name_teacher}', 
                '${teacher.lastname_teacher}', 
                '${teacher.mother_lastname_teacher}', 
                '${teacher.type_document}', 
                '${teacher.document_number}', 
                '${teacher.gender}', 
                '${teacher.phone}'
            )ON DUPLICATE KEY UPDATE
                name = VALUES(name), 
                lastname = VALUES(lastname), 
                mother_lastname = VALUES(mother_lastname),
                type_document = VALUES(type_document), 
                document_number = VALUES(document_number), 
                gender = VALUES(gender), 
                phone = VALUES(phone)
        `);

        // OBTENEMOS EL ID DESPUES DE LA INSERCION O ACTUALIZACIO
        const [getUserPersonalInfo] = await connection.raw(`
            SELECT 
                id 
            FROM 
                user_personal_info 
            WHERE 
                document_number = '${teacher.document_number}'
        `);
        const user_personal_info_id = getUserPersonalInfo[0].id;

        // SE REALIZA EL INSERT O UPDATE DEL DOCENTE DE DATOS SOCIALES.
        const [user_social_information] = await connection.raw(`
            INSERT INTO
            user_social_information(
                user_personal_info_id,
                email,
                phone
            )VALUES(
                ${user_personal_info_id},
                '${teacher.email}',
                '${teacher.phone}'
            )ON DUPLICATE KEY UPDATE
                user_personal_info_id = VALUES(user_personal_info_id), 
                email = VALUES(email),
                phone = VALUES(phone)
        `)

        // SE REALIZA EL INSERT O UPDATE DEL DOCENTE DE DATOS CIVILES.
        const [user_civilian_information] = await connection.raw(`
            INSERT INTO
            user_civilian_information(
                user_personal_info_id,
                birthdate,
                country_birth,
                nationality
            )VALUES(
                ${user_personal_info_id},
                '${teacher.birthdate}',
                '${teacher.country_birth}',
                '${teacher.nationality}'
            )ON DUPLICATE KEY UPDATE
                user_personal_info_id = VALUES(user_personal_info_id), 
                birthdate = VALUES(birthdate),
                country_birth = VALUES(country_birth),
                nationality = VALUES(country_birth)
        `)

        // SE VINCULA EL REGISTRO DEL DOCENTE CON LA TABLA DE DOCENTES
        const [sys_teachers] = await connection.raw(`
            INSERT INTO
            sys_teachers(
                user_personal_info_id
            )VALUES(
                ${user_personal_info_id}
            )ON DUPLICATE KEY UPDATE
                user_personal_info_id = VALUES(user_personal_info_id)
        `)
        
        coursesSelected.forEach(async (courseSelected) => {
            const [sys_courses_teachers] = await connection.raw(`
            INSERT INTO
                sys_courses_teachers(
                    sys_teachers_id,
                    sys_courses_id,
                    isBoss,
                    isInspector
                )VALUES(
                    2,
                    ${courseSelected.courseId},
                    ${courseSelected.isBoss},
                    ${courseSelected.isInspector}
                )
            `)
        });

        result(null, true);
    } catch (error) {
        console.error('Error fetching subject from tenant database', error);
        result(error, null);
    }
}

module.exports = teachers;