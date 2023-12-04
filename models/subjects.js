const dbSchool = require('../db');
const subjects = {};

subjects.getSubjects = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listSubjects] = await connection.raw(`
            SELECT
                ss.id,
                ss.code_mineduc,
                sts.name AS type,
                ss.name,
                ss.color,
                ss.hour,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', CONVERT(sg.id, char),
                        'name', sg.name,
                        'type_grade', stt.name
                    )
                ) AS grades
            FROM sys_subjects AS ss
            INNER JOIN sys_type_subjects AS sts ON sts.id = ss.sys_type_subjects_id
            INNER JOIN sys_grades_subjects AS sgs ON sgs.sys_subjects_id = ss.id
            INNER JOIN sys_grades AS sg ON sgs.sys_grade_id = sg.id
            INNER JOIN sys_types_teachings AS stt ON stt.id = sg.sys_type_teaching_id
            WHERE ss.deleted_at IS NULL AND sgs.deleted_at IS NULL
            GROUP BY ss.id
            ORDER BY ss.id
        `);

        result(null, listSubjects)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getSubjects')
        await dbSchool.closeConnection();
    }
}

subjects.create = async (subject, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const { grade_ids, typesubjects_ids } = subject;

        typesubjects_ids.forEach(async (sys_type_subjects_id) => {
            const [addSubjects] = await connection.raw(`
                INSERT INTO sys_subjects(
                    sys_type_subjects_id,
                    name,
                    code_mineduc,
                    color,
                    hour
                )VALUES(
                    '${sys_type_subjects_id}',
                    '${subject.name}',
                    '${subject.code_mineduc}',
                    '${subject.color}',
                    '${subject.hour}'
                )
            `)

            grade_ids.forEach(async (sys_grade_id) => {
                const [addGradesSubjects] = await connection.raw(`
                    INSERT INTO sys_grades_subjects(
                        sys_grade_id,
                        sys_subjects_id
                    )VALUES(
                        '${sys_grade_id}',
                        '${addSubjects.insertId}'
                    )
                `)
            });
        });
        
        result(null, true);
    } catch (error) {
        console.error('Error fetching subject from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Subjects create')
        await dbSchool.closeConnection();
    }
}

subjects.update = async (subject, result) => {
    const connection = await dbSchool.getConnection();
    const { id, grade_ids, name, code_mineduc, color, hour } = subject;
    
    try {
        const [updateSubject] = await connection.raw(`
            UPDATE sys_subjects
            SET
                name = '${name}',
                code_mineduc = '${code_mineduc}',
                color = '${color}',
                hour = '${hour}',
                updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
            WHERE
                id = ${subject.id}
        `);

        result(null, updateSubject.insertId);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Subjects update')
        await dbSchool.closeConnection();
    }
    
    /*
    const [subjectById] = await connection.raw(`
        SELECT
            sgs.id AS id_sys_grades_subjects
        FROM sys_subjects AS ss
        INNER JOIN sys_type_subjects AS sts ON sts.id = ss.sys_type_subjects_id
        INNER JOIN sys_grades_subjects AS sgs ON sgs.sys_subjects_id = ss.id
        INNER JOIN sys_grades AS sg ON sgs.sys_grade_id = sg.id
        INNER JOIN sys_types_teachings AS stt ON stt.id = sg.sys_type_teaching_id
        WHERE ss.id = ${id} AND sgs.deleted_at IS NULL
        ORDER BY ss.id
    `);

    const selectDeleteSubjectsGradesToId = subjectById.filter(
        subject =>  !grade_ids.includes(subject.id_grades)
    );
    
    console.log('subjectGradeToday: ' + JSON.stringify(subjectById, null, 3));

    console.log('grade_ids: ' + grade_ids);
    
    const deleteSubjectsGrades = await Promise.all(selectDeleteSubjectsGradesToId.map(async (subject) => {
        const [deleteSubject] = await connection.raw(`
            UPDATE sys_grades_subjects
            SET
                deleted_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
            WHERE
                id = ${subject.id_sys_grades_subjects}
        `);
        return deleteSubject;
    }));
    
    console.log('subject: ' + JSON.stringify(subjectById, null, 3));
    
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
        
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    } 
    */
}

subjects.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [deleteSubject] = await connection.raw(`
            UPDATE sys_subjects
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

module.exports = subjects;