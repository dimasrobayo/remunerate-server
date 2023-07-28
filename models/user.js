const bcrypt = require('bcryptjs');
const dbSchool = require('../db');
const User = {};


User.findById = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [user] = await connection.execute(`
        SELECT 
            u.id,
            u.name,
            u.lastname,
            u.email,
            u.phone,
            u.image,
            u.password,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(r.id, char),
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )
            ) AS roles
        FROM users AS u
        INNER JOIN user_has_roles AS uhr ON uhr.id_user = u.id
        INNER JOIN roles AS r ON r.id = uhr.id_rol
        WHERE u.id = ${id}
        GROUP BY u.id
        `);
        
        result(null, user[0])
    } catch (error) {
        console.error('Error fetching users from tenant database', err);
        result(error, null);
    }
}

User.findByEmail = async(email, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [user] = await connection.execute(`
        SELECT 
            u.id,
            u.name,
            u.lastname,
            u.email,
            u.phone,
            u.image,
            u.password,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(r.id, char),
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )
            ) AS roles
            FROM users AS u
            INNER JOIN user_has_roles AS uhr ON uhr.id_user = u.id
            INNER JOIN roles AS r ON r.id = uhr.id_rol
            WHERE u.email = '${email}'
            GROUP BY u.id
        `);
        
        result(null, user[0])
    } catch (error) {
        console.error('Error fetching users from tenant database', err);
        result(error, null);
    }
}

module.exports = User;