const dbSchool = require('../db');
const typesTeaching = {};

typesTeaching.getTypeTeaching = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const listTypeTeaching =  await connection('sys_types_teachings as stt')
            .select('stt.*')
            .orderBy('stt.codigo');

        result(null, listTypeTeaching)
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

typesTeaching.create = async (type, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const { codigo, name } = type

        const createTypeTeaching = await connection('sys_types_teachings')
        .insert({
            codigo: codigo,
            name: name
        })

        result(null, createTypeTeaching[0]);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de Teaching create')
        //await dbSchool.closeConnection();
    }
}

typesTeaching.edit = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();

        const editTypeTeaching = await connection('sys_types_teachings as stt')
            .select('stt.*')
            .where('stt.id', id)
            .orderBy('stt.codigo');

        result(null, editTypeTeaching);
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

typesTeaching.update = async (type, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const { id, codigo, name } = type;

        const updateTypeTeaching = await connection('sys_types_teachings')
            .where('id', id)
            .update({
                codigo: codigo,
                name: name,
                updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            })
        result(null, updateTypeTeaching[0]);
    } catch (error) {
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

typesTeaching.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const deleteTypeTeaching = await connection('sys_types_teachings')
        .where('id', id)
        .del();

        result(null, id);
    } catch (error) {
        console.error('Error fetching typesTeaching from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de Teaching delete')
        //await dbSchool.closeConnection();
    }
}

module.exports = typesTeaching;