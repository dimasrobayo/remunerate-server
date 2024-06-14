const dbSchool = require('../db');
const teachers = {};

teachers.getTeachers = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const listCourse = await connection('sys_teachers as st')
        .select(
            'st.id AS id_teacher',
            'upi.id AS id_grade',
            'upi.name',
            'upi.lastname',
            'upi.mother_lastname',
            'upi.type_document',
            'upi.document_number',
            'upi.gender',
            'usi.email',
            'uci.birthdate',
            'upi.phone',
            'upi.image'
        )
        .innerJoin('user_personal_info as upi', 'st.user_personal_info_id', 'upi.id')
        .leftJoin('user_social_information as usi', 'usi.user_personal_info_id', 'upi.id')
        .innerJoin('user_civilian_information as uci', 'uci.user_personal_info_id', 'upi.id')
        .whereNull('st.deleted_at')
        .orderBy('st.id');
        
        result(null, listCourse)
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

teachers.create = async (teacher, result) => {
    const { 
        name_teacher, 
        lastname_teacher, 
        mother_lastname_teacher, 
        type_document,
        document_number,
        gender,
        phone,
        email,
        coursesSelected 
    } = teacher
    
    try {
        const connection = await dbSchool.getConnection();

        // SE REALIZA EL INSERT O UPDATE DEL DOCENTE DE DATOS PERSONALES.
        await connection('user_personal_info')
            .insert({
                name: name_teacher,
                lastname: lastname_teacher,
                mother_lastname: mother_lastname_teacher,
                type_document: type_document,
                document_number: document_number,
                gender: gender,
                phone: phone
            })
            .onConflict('document_number')
            .merge();

        // OBTENEMOS EL ID DESPUÉS DE LA INSERCIÓN O ACTUALIZACIÓN
        const getUserPersonalInfo = await connection('user_personal_info as upi')
            .select('upi.id')
            .where('document_number', document_number);

        const user_personal_info_id = getUserPersonalInfo[0].id;

        // SE REALIZA EL INSERT O UPDATE DEL DOCENTE DE DATOS SOCIALES.
        await connection('user_social_information')
            .insert({
                user_personal_info_id: user_personal_info_id,
                email: email,
                phone: phone
            })
            .onConflict('user_personal_info_id')
            .merge();

        // SE REALIZA EL INSERT O UPDATE DEL DOCENTE DE DATOS CIVILES.
        await connection('user_civilian_information')
            .insert({
                user_personal_info_id: user_personal_info_id,
                birthdate: teacher.birthdate,
                country_birth: teacher.country_birth,
                nationality: teacher.nationality
            })
            .onConflict('user_personal_info_id')
            .merge();

        // SE VINCULA EL REGISTRO DEL DOCENTE CON LA TABLA DE DOCENTES
        await connection('sys_teachers')
            .insert({
                user_personal_info_id: user_personal_info_id
            })
            .onConflict('user_personal_info_id')
            .merge();

        // CONSULTA PARA OBTENER EL ID DEL TEACHER
        const sysTeachers = await connection('sys_teachers')
            .select('id')
            .where('user_personal_info_id', user_personal_info_id);

        const sysTeachersId = sysTeachers[0].id;

        // ADD OR UPDATE TO THE TEACHER
        const get_addresses = await connection('user_addresses_personal_info as uapi')
            .select('uapi.address_id', 'uapi.user_personal_info_id')
            .where('uapi.user_personal_info_id', user_personal_info_id);

        if (get_addresses.length > 0) {
            await connection('user_addresses')
                .update({
                    address: teacher.address,
                    department_number: teacher.department_number,
                    sys_community_id: teacher.sys_community_id,
                    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                })
                .where('id', get_addresses[0].address_id);
        } else {
            const [insertAddress] = await connection('user_addresses')
                .insert({
                    address: teacher.address,
                    department_number: teacher.department_number,
                    sys_community_id: teacher.sys_community_id
                });

            await connection('user_addresses_personal_info')
                .insert({
                    address_id: insertAddress,
                    user_personal_info_id: user_personal_info_id
                });
        }

        // Añadir o actualizar cursos seleccionados para el docente
        for (const courseSelected of coursesSelected) {
            await connection('sys_courses_teachers')
                .insert({
                    sys_teachers_id: sysTeachersId,
                    sys_courses_id: courseSelected.sys_courses_id,
                    isBoss: courseSelected.isBoss,
                    isInspector: courseSelected.isInspector
                })
                .onConflict(['sys_teachers_id', 'sys_courses_id'])
                .merge();
        }

        result(null, true);

    } catch (error) {
        result(error, null);
    } finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

teachers.teacherByDocumentNumber = async (documetNumber, result) => {
    try {
        const connection = await dbSchool.getConnection();

        const teacher = connection('sys_teachers AS st')
        .select(
            'upi.id AS id_personalInfo',
            'st.id AS id_teacher',
            'upi.name',
            'upi.lastname',
            'upi.mother_lastname',
            'upi.type_document',
            'upi.document_number',
            'upi.gender',
            'usi.email',
            'uci.birthdate',
            'upi.phone',
            'upi.image',
            'ua.address',
            'country_birth.name AS country_birth',
            'country_birth.id AS country_birth_id',
            'nationality.name AS nationality',
            'nationality.id AS nationality_id',
            'sc.id AS sys_community_id',
            'sr.id AS sys_regions_id',
            'ua.department_number'
        )
        .leftJoin('user_personal_info AS upi', 'st.user_personal_info_id', 'upi.id')
        .leftJoin('user_social_information AS usi', 'usi.user_personal_info_id', 'upi.id')
        .leftJoin('user_civilian_information AS uci', 'uci.user_personal_info_id', 'upi.id')
        .leftJoin('user_addresses_personal_info AS uapi', 'uapi.user_personal_info_id', 'upi.id')
        .leftJoin('user_addresses AS ua', 'uapi.address_id', 'ua.id')
        .leftJoin('sys_community AS sc', 'sc.id', 'ua.sys_community_id')
        .leftJoin('sys_provinces AS sp', 'sp.id', 'sc.provincia_id')
        .leftJoin('sys_regions AS sr', 'sr.id', 'sp.region_id')
        .leftJoin('sys_countries AS country_birth', 'country_birth.id', 'uci.country_birth')
        .leftJoin('sys_countries AS nationality', 'nationality.id', 'uci.nationality')
        .where('upi.document_number', documetNumber)
        .whereNull('st.deleted_at')
        .orderBy('st.id');

        const sqlQuery = queryBuilder.toSQL();
        console.log(sqlQuery);
        
        if(teacher.length > 0){
            const courseTeacher = await connection('sys_courses_teachers as sct')
            .select(
                'sg.name as gradeName',
                'sc.name as courseName',
                'sct.sys_courses_id',
                'sct.id as idSysCoursesTeachers',
                'sct.isBoss',
                'sct.isInspector'
            )
            .innerJoin('sys_courses as sc', 'sc.id', 'sct.sys_courses_id')
            .innerJoin('sys_grades as sg', 'sg.id', 'sc.sys_grade_id') 
            .where('sct.sys_teachers_id', teacher[0].id_teacher);
            
            teacher[0].courseTeacher = courseTeacher || [];
            
            result(null, teacher[0])
        } else {
            result(null, {})
        }
    } catch (error) {
        result(error, null);
    } finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

teachers.deleteTeacherCourse = async (idSysCourseTeacher, result) => {
    try {
        const connection = await dbSchool.getConnection();
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
    } finally {
        // Cierra la conexión después de realizar las operaciones
        await dbSchool.closeConnection();
    }
}

teachers.isBoss = async (idCoursesTeacher, result) => {
    try {
        const connection = await dbSchool.getConnection();
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
    } finally {
        // Cierra la conexión después de realizar las operaciones
        await dbSchool.closeConnection();
    }
}

teachers.isInspector = async (idCoursesTeacher, result) => { 
    try {
        const connection = await dbSchool.getConnection();
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
    } finally {
        // Cierra la conexión después de realizar las operaciones
        await dbSchool.closeConnection();
    }
}

teachers.delete = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();
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
    } finally {
        // Cierra la conexión después de realizar las operaciones
        await dbSchool.closeConnection();
    }
}

module.exports = teachers;