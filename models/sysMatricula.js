const dbSchool = require('../db');
const sys_matriculas = {};
const tableName = 'sys_matriculas';
const userTable = 'user_personal_info';
const coursesTable = 'sys_courses';
const periodTable = 'sys_school_period';
const modalityTable = 'sys_matricula_modality';



sys_matriculas.get = async (params,connection_trx) => {
    const connection = connection_trx;
    const currentYear = new Date().getFullYear().toString();
    
    if (params.id) {
        params[`${tableName}.id`] = params.id;
        delete params.id; // avoid field id is ambiguous
    }
    console.log(params);
    
    try {
        const query = connection
            .select(`${tableName}.id`,
                `${tableName}.date_matricula`,
                `${tableName}.create_at`,
                `${userTable}.name`,
                `${userTable}.mother_lastname`,
                `${userTable}.lastname`,
                `${coursesTable}.name as curso`,
                `${periodTable}.año_escolar`,
                `${modalityTable}.name as modality`)
            .from(tableName)
            .join(userTable, `${tableName}.user_personal_info_id`, `user_personal_info.id`)
            .join(coursesTable, `${tableName}.sys_courses_id`, `sys_courses.id`)
            .join(periodTable, `${tableName}.sys_school_period_id`, `sys_school_period.id`)
            .join(modalityTable, `${tableName}.sys_matricula_modality_id`, `sys_matricula_modality.id`)
            .whereNull(`${tableName}.deleted_at`)
            .where('sys_school_period.año_escolar', currentYear);;

        if (params && Object.keys(params).length > 0) {
            query.andWhere(params);
        }

        // Imprimir la consulta SQL generada
        const sql = query.toSQL().toNative();
        console.log('Executing query:', sql.sql, 'with bindings:', sql.bindings);


        const sysMatricula = await query;
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

sys_matriculas.update = async (id,params,connection_trx) =>{
    const connection = await dbSchool.getConnection();
    
    try {
        const sysMatricula = await connection.from(tableName)
            .whereNull('deleted_at') // Condición para que deleted_at sea null
            .andWhere('id', id)
            .update(params);
        
        
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