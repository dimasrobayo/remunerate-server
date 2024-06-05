const dbSchool = require('../db');
const subjects = {};

subjects.getSubjects = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const listSubjects = await connection('sys_subjects as ss')
            .select(
                'ss.id',
                'ss.code_mineduc',
                'sts.name as type',
                'ss.name',
                'ss.color',
                'ss.hour',
                connection.raw('JSON_ARRAYAGG(JSON_OBJECT(\'id\', sg.id, \'name\', sg.name, \'type_grade\', stt.name)) as grades')
            )
            .innerJoin('sys_type_subjects as sts', 'sts.id', 'ss.sys_type_subjects_id')
            .innerJoin('sys_grades_subjects as sgs', 'sgs.sys_subjects_id', 'ss.id')
            .innerJoin('sys_grades as sg', 'sgs.sys_grade_id', 'sg.id')
            .innerJoin('sys_types_teachings as stt', 'stt.id', 'sg.sys_type_teaching_id')
            .whereNull('ss.deleted_at')
            .whereNull('sgs.deleted_at')
            .groupBy('ss.id')
            .orderBy('ss.id');
            
        result(null, listSubjects);
    } catch (error) {
        console.error('Error fetching subjects from tenant database', error);
        result(error, null);
    } finally {
        dbSchool.closeConnection();
    }
};

subjects.create = async (subject, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const { 
            grade_ids, 
            typesubjects_ids, 
            name, 
            code_mineduc, 
            color,
            hour
        } = subject;
        
        let success = true;

        for (const sys_type_subjects_id of typesubjects_ids) {
            const addSubjects = await connection('sys_subjects')
            .insert({
                sys_type_subjects_id: sys_type_subjects_id,
                name: name,
                code_mineduc: code_mineduc,
                color: color,
                hour: hour
            });

            if (!addSubjects || !addSubjects[0]) {
                success = false;
                break;
            }

            for (const sys_grade_id of grade_ids) {
                const addGradesSubjects = await connection('sys_grades_subjects').insert({
                    sys_grade_id: sys_grade_id,
                    sys_subjects_id: addSubjects[0]
                });

                if (!addGradesSubjects || !addGradesSubjects[0]) {
                    success = false;
                    break;
                }
            };
        };

        result(null, success);
    } catch (error) {
        result(error, null);
    } finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

subjects.update = async (subject, result) => {
    const { 
        id, 
        grade_ids, 
        name, 
        code_mineduc, 
        color, 
        hour 
    } = subject;

    let success = true;
    
    try {
        const connection = await dbSchool.getConnection();
        const updateSubject = await connection('sys_subjects')
        .where('id', id)
        .update({
            name: name,
            code_mineduc: code_mineduc,
            color: color,
            hour: hour,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })

        result(null, updateSubject[0]);
    } catch (error) {
        result(error, null);
    } finally {
        dbSchool.closeConnection();
    }
}

subjects.delete = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();
        
        const deleteSubject = await connection('sys_subjects')
        .where('id', id)
        .update({
            deleted_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })

        result(null, deleteSubject[0]);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    } finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

module.exports = subjects;