const dbSchool = require('../db');
const teachers = {};

teachers.getTeachers = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listCourse] = await connection.raw(`
        SELECT 
            st.id AS id_teacher,
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
        LEFT JOIN user_social_information usi ON usi.user_personal_info_id = upi.id
        JOIN user_civilian_information uci ON uci.user_personal_info_id = upi.id
        WHERE st.deleted_at IS NULL
        ORDER BY st.id
        `);

        result(null, listCourse)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
       // console.log('Cierra la conexión después de getCourses')
        //await dbSchool.closeConnection();
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
                nationality = VALUES(nationality)
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

        // CONSULTA PARA OBTENER EL ID DEL TEACHER
        const [sysTeachers] = await connection.raw(`
            SELECT id FROM sys_teachers 
            WHERE user_personal_info_id = ${user_personal_info_id}
        `);
        const sysTeachersId = sysTeachers[0].id;


        // ADD OR UPDATE TO THE TEACHER
        const [get_addresses] = await connection.raw(`
            SELECT 
                uapi.address_id, 
                uapi.user_personal_info_id
            FROM 
                user_addresses_personal_info AS uapi
            WHERE
                uapi.user_personal_info_id = '${user_personal_info_id}'
        `);

        if (get_addresses.length > 0) {
            const [updateAddress] = await connection.raw(`
                UPDATE user_addresses
                SET
                    address = '${teacher.address}',
                    department_number = '${teacher.department_number}',
                    sys_community_id = '${teacher.sys_community_id}',
                    updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                WHERE
                    id = ${get_addresses[0].address_id}
            `);
        }else{
            const [insertAddress] = await connection.raw(`
                INSERT INTO
                user_addresses(
                    address,
                    department_number,
                    sys_community_id
                )VALUES(
                    '${teacher.address}',
                    '${teacher.department_number}',
                    '${teacher.sys_community_id}'
                )
            `);

            const [insertAddressPersonalInfo] = await connection.raw(`
                INSERT INTO user_addresses_personal_info(
                    address_id,
                    user_personal_info_id
                )VALUES(
                    '${insertAddress.insertId}',
                    '${user_personal_info_id}'
                )
            `)
        }

        coursesSelected.forEach(async (courseSelected) => {
            const [sys_courses_teachers] = await connection.raw(`
            INSERT INTO
                sys_courses_teachers(
                    sys_teachers_id,
                    sys_courses_id,
                    isBoss,
                    isInspector
                )VALUES(
                    ${sysTeachersId},
                    ${courseSelected.sys_courses_id},
                    ${courseSelected.isBoss},
                    ${courseSelected.isInspector}
                )ON DUPLICATE KEY UPDATE
                    sys_teachers_id = VALUES(sys_teachers_id),
                    sys_courses_id = VALUES(sys_courses_id),
                    isBoss = VALUES(isBoss),
                    isInspector = VALUES(isInspector)
            `)
        });

        result(null, true);
    } catch (error) {
        console.error('Error fetching subject from tenant database', error);
        result(error, null);
    }
}

teachers.teacherByDocumentNumber = async (documetNumber, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [teacher] = await connection.raw(`
            SELECT 
                upi.id AS id_personalInfo,
                st.id AS id_teacher,
                upi.name,
                upi.lastname,
                upi.mother_lastname,
                upi.type_document,
                upi.document_number,
                upi.gender,
                usi.email,
                uci.birthdate,
                upi.phone,
                upi.image,
                ua.address,
                country_birth.name AS country_birth,
                country_birth.id AS country_birth_id,
                nationality.name AS nationality,
                nationality.id AS nationality_id,
                sc.id AS sys_community_id,
                sr.id AS sys_regions_id,
                ua.department_number
            FROM sys_teachers AS st
            LEFT JOIN user_personal_info AS upi ON st.user_personal_info_id = upi.id
            LEFT JOIN user_social_information AS usi ON usi.user_personal_info_id = upi.id
            LEFT JOIN user_civilian_information AS uci ON uci.user_personal_info_id = upi.id
            LEFT JOIN user_addresses_personal_info AS uapi ON uapi.user_personal_info_id = upi.id
            LEFT JOIN user_addresses AS ua ON uapi.address_id = ua.id
            LEFT JOIN sys_community AS sc ON sc.id = ua.sys_community_id
            LEFT JOIN sys_provinces AS sp ON sp.id = sc.provincia_id
            LEFT JOIN sys_regions AS sr ON sr.id = sp.region_id
            LEFT JOIN sys_countries AS country_birth ON country_birth.id = uci.country_birth
            LEFT JOIN sys_countries AS nationality ON nationality.id = uci.nationality
            WHERE st.deleted_at IS NULL AND st.deleted_at IS NULL AND upi.document_number = '${documetNumber}'
            ORDER BY st.id;
        `);

        if(teacher.length > 0){
            const [courseTeacher] = await connection.raw(`
                SELECT
                    sg.name AS gradeName,
                    sc.name AS courseName,
                    sct.sys_courses_id,
                    sct.id AS idSysCoursesTeachers,
                    sct.isBoss,
                    sct.isInspector
                FROM
                    sys_courses_teachers AS sct
                JOIN sys_courses AS sc ON sc.id = sct.sys_courses_id
                JOIN sys_grades AS sg ON sg.id = sc.sys_grade_id 
                WHERE sct.sys_teachers_id = ${teacher[0].id_teacher}
            `)

            teacher[0].courseTeacher = courseTeacher || [];
            result(null, teacher[0])
        } else {
            result(null, {})
        }
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

teachers.deleteTeacherCourse = async (idSysCourseTeacher, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [deleteTeacherCourse] = await connection.raw(`
            DELETE 
            FROM 
                sys_courses_teachers 
            WHERE id = ${idSysCourseTeacher}
        `)
        result(null, true);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Subjects delete')
        await dbSchool.closeConnection();
    }
}

teachers.isBoss = async (idCoursesTeacher, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [isBoss] = await connection.raw(`
            UPDATE 
                sys_courses_teachers
            SET
                isBoss = CASE WHEN isBoss = 0 THEN 1 ELSE 0 END
            WHERE
                id = ${idCoursesTeacher}
        `)

        result(null, true)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

teachers.isInspector = async (idCoursesTeacher, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [isBoss] = await connection.raw(`
            UPDATE 
                sys_courses_teachers
            SET
                isInspector = CASE WHEN isBoss = 0 THEN 1 ELSE 0 END
            WHERE
                id = ${idCoursesTeacher}
        `)

        result(null, true)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

teachers.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();
    console.log(id)
    try {
        const [deleteTeacher] = await connection.raw(`
            UPDATE 	sys_teachers
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
        console.log('Cierra la conexión después de Subjects delete')
        await dbSchool.closeConnection();
    }
}

module.exports = teachers;