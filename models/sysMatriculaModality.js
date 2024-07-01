const dbSchool = require('../db');
const matriculaModality = {};
const tableName = 'sys_matricula_modality';


matriculaModality.getMatriculaModalityByparams = async (params,connection_trx) => {
    const connection = connection_trx;
    try {
        const [matriculaMod] = await connection.select('*').from(tableName).where(params);
        return matriculaMod ? matriculaMod : null
    } catch (error) {
        console.error('Error fetching sys_matricula_modality from tenant database', error);
        return null;
    }

}



module.exports = matriculaModality;