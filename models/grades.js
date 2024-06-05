const dbSchool = require('../db');
const grades = {};

grades.getGrades = async (result) => {
    try {
        const connection = await dbSchool.getConnection();

        const listGrades = await connection('sys_grades as g')
        .select(
            'tt.id AS id_type_teaching',
            'tt.codigo AS code_type_teaching',
            'tt.name as name_type_teaching',
            'g.*'
        )
        .innerJoin('sys_types_teachings as tt', 'tt.id', 'g.sys_type_teaching_id')
        .where('tt.status', 'ACTIVO')
        .whereNull('g.deleted_at')
        .orderBy('g.id');

        result(null, listGrades)
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

grades.create = async (grade, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const { code_grade, name, sys_type_teaching_id } = grade;

        const [createGrade] = await connection('sys_grades')
        .insert({
            code_grade: code_grade,
            name: name,
            sys_type_teaching_id: sys_type_teaching_id
        })

        result(null, createGrade[0]);
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

grades.update = async (grade, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const { id, code_grade, name, sys_type_teaching_id } = grade;

        const updateGrade = await connection('sys_grades')
        .where('id', id)
        .update({
            code_grade: code_grade,
            name: name,
            sys_type_teaching_id: sys_type_teaching_id,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })

        result(null, updateGrade[0]);
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

grades.delete = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const deleteGrade = await connection('sys_grades')
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

module.exports = grades;