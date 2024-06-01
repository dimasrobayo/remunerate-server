const dbSchool = require('../db');
const typesTeaching = {};

typesTeaching.getTypeTeaching = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [listTypeTeaching] = await connection.raw(`
            SELECT 
                *
            FROM sys_types_teachings AS tt
            ORDER BY tt.id
        `);

        result(null, listTypeTeaching)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getTypeTeaching')
        await dbSchool.closeConnection();
    }
}

typesTeaching.create = async (type, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [createTypeTeaching] = await connection.raw(`
            INSERT INTO sys_types_teachings(
                codigo,
                name
            )VALUES(
                '${type.codigo.trim()}',
                '${type.name.trim().toUpperCase()}'
            )
        `)

        result(null, createTypeTeaching.insertId);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Teaching create')
        await dbSchool.closeConnection();
    }
}

typesTeaching.edit = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const [editTypeTeaching] = await connection.raw(`
            SELECT 
                *
            FROM sys_types_teachings AS tt
            WHERE
                tt.id = ${id}
            ORDER BY tt.id
        `)
        result(null, editTypeTeaching[0]);
    } catch (error) {
        console.error('Error fetching typesTeaching from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Teaching edit')
        await dbSchool.closeConnection();
    }
}

typesTeaching.update = async (type, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [updateTypeTeaching] = await connection.raw(`
            UPDATE sys_types_teachings
            SET
                codigo  = '${type.codigo}',
                name = '${type.name}',
                updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
            WHERE
                id = ${type.id}
        `)

        result(null, updateTypeTeaching.insertId);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Teaching update')
        await dbSchool.closeConnection();
    }
}

typesTeaching.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [editTypeTeaching] = await connection.raw(`
            DELETE FROM sys_types_teachings WHERE id = ${id}
        `)
        result(null, id);
    } catch (error) {
        console.error('Error fetching typesTeaching from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Teaching delete')
        await dbSchool.closeConnection();
    }
}

module.exports = typesTeaching;