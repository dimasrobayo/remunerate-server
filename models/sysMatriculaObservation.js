const dbSchool = require('../db');
const sys_matricula_observation = {};
const tableName = 'sys_matricula_observation';


sys_matricula_observation.get = async (params) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [sysMatriculaObservation] = await connection.select('*').from(tableName).where(params)
        return sysMatriculaObservation;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    
}



sys_matricula_observation.create = async (matriculaObservation, connection_trx) => {
    const connection = connection_trx;
    try {
        
        const [sysMatricula] = await connection.insert(matriculaObservation).into(tableName)
        return sysMatricula.insertId;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de sys_matriculas create')
        //await dbSchool.closeConnection();
    }
}

module.exports = sys_matricula_observation;