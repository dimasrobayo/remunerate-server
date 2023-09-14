const bcrypt = require('bcryptjs');
const dbSchool = require('../db');
const typesTeaching = {};

typesTeaching.getTypeTeaching = async (result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [listTypeTeaching] = await connection.execute(`
            SELECT 
                *
            FROM types_teaching AS tt
            ORDER BY tt.id
        `);

        result(null, listTypeTeaching)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

typesTeaching.create = async (type, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [createTypeTeaching] = await connection.execute(`
            INSERT INTO types_teaching(
                codigo,
                name
            )VALUES(
                '${type.codigo}',
                '${type.name}'
            )
        `)

        result(null, createTypeTeaching.insertId);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

typesTeaching.edit = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [editTypeTeaching] = await connection.execute(`
            SELECT 
                *
            FROM types_teaching AS tt
            WHERE
                tt.id = ${id}
            ORDER BY tt.id
        `)
        result(null, editTypeTeaching[0]);
    } catch (error) {
        console.error('Error fetching typesTeaching from tenant database', error);
        result(error, null);
    }
}

typesTeaching.update = async (type, result) => {
    const connection = await dbSchool.getConnection();
    console.log(type);

    try {
        const [updateTypeTeaching] = await connection.execute(`
            UPDATE types_teaching
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
}

typesTeaching.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [editTypeTeaching] = await connection.execute(`
            DELETE FROM types_teaching WHERE id = ${id}
        `)
        result(null, id);
    } catch (error) {
        console.error('Error fetching typesTeaching from tenant database', error);
        result(error, null);
    }
}

module.exports = typesTeaching;