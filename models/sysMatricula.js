const dbSchool = require('../db');
const sys_matriculas = {};
const tableName = 'sys_matriculas';


sys_matriculas.get = async (params) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [sysMatricula] = await connection.select('*').from(tableName).where(params)
        return sysMatricula;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    
}


sys_matriculas.getSysMatriculaById = async (id) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [sysMatricula] = await connection.select('*').from(tableName).where('id', id).whereNull('deleted_at')
        return sysMatricula;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    
}



sys_matriculas.create = async (matricula, connection_trx) => {
    const connection = connection_trx;
    try {
        
        const [sysMatricula] = await connection.insert(matricula).into(tableName)
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

sys_matriculas.update = async (id) =>{
    const connection = await dbSchool.getConnection();
    
    try {
        //await connection.raw(`SELECT * FROM sys_matriculas where id = 25 and deleted_at is null`);
        const sysMatricula = await connection.from(tableName).where('id', id)
            .update({
                deleted_at: new Date(),
                updated_at: new Date(),

            })
        
        
        return sysMatricula;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de update')
        await dbSchool.closeConnection();
    }
};

sys_matriculas.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [editTypeTeaching] = await connection.raw(`
            DELETE FROM ${tableName} WHERE id = ${id}
        `)
        result(null, id);
    } catch (error) {
        console.error('Error fetching sys_matriculas from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Teaching delete')
        await dbSchool.closeConnection();
    }
}

module.exports = sys_matriculas;