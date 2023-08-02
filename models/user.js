const bcrypt = require('bcryptjs');
const dbSchool = require('../db');
const User = {};


User.findById = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [user] = await connection.execute(`
        SELECT 
            u.id,
            upi.name,
            upi.lastname,
            u.email,
            upi.phone,
            upi.image,
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
        INNER JOIN user_has_roles AS uhr ON uhr.users_id = u.id
        INNER JOIN roles AS r ON r.id = uhr.roles_id
        INNER JOIN user_personal_info AS upi ON upi.id = u.user_personal_info_id
        WHERE u.id = ${id} and u.status_user_id = 1
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
            upi.name,
            upi.lastname,
            u.email,
            upi.phone,
            upi.image,
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
            INNER JOIN user_has_roles AS uhr ON uhr.users_id = u.id
            INNER JOIN roles AS r ON r.id = uhr.roles_id
            INNER JOIN user_personal_info AS upi ON upi.id = u.user_personal_info_id
            WHERE u.email = '${email}' and u.status_user_id = 1
            GROUP BY u.id
        `);
        
        result(null, user[0])
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

User.create = async (user, result) => {
    const connection = await dbSchool.getConnection();
    const {addresses, health_information, social_information, rol} = user;
    const hash = await bcrypt.hash(user.password, 10);

    try {
        const [validateInfo] = await connection.execute(`
            SELECT 
                upi.document_number
            FROM 
                user_personal_info AS upi
            WHERE 
                upi.document_number = '${user.document_number}'
        `);

        if(validateInfo.length === 0) {
            const [user_personal_info] = await connection.execute(`
                INSERT INTO
                    user_personal_info(
                        name,
                        lastname,
                        mother_lastname,
                        type_document,
                        document_number,
                        gender,
                        phone
                    )
                VALUES(
                    '${user.name}', 
                    '${user.lastname}', 
                    '${user.mother_lastname}', 
                    '${user.type_document}', 
                    '${user.document_number}', 
                    '${user.gender}', 
                    '${user.phone}'
                )
            `);

            const [user_addresses] = await connection.execute(`
                INSERT INTO
                    user_addresses(
                        address,
                        codigo_postal,
                        comuna_id,
                        department_number
                    )
                VALUES(
                    '${addresses.address}', 
                    '${addresses.codigo_postal}', 
                    '${addresses.comuna_id}', 
                    '${addresses.department_number}'
                )
            `);

            const [user_addresses_personal_info] = await connection.execute(`
                INSERT INTO
                    user_addresses_personal_info(
                        address_id,
                        user_personal_info_id
                    )
                VALUES(
                    ${user_addresses.insertId}, 
                    ${user_personal_info.insertId}
                )
            `);

            const [user_health_information] = await connection.execute(`
                INSERT INTO
                    user_health_information(
                        user_personal_info_id,
                        blood_type,
                        allergy,
                        observation
                    )
                VALUES(
                    ${user_personal_info.insertId},
                    '${health_information.blood_type}',
                    '${health_information.allergy}',
                    '${health_information.observation}'
                )
            `);

            const [user_social_information] = await connection.execute(`
                INSERT INTO
                    user_social_information(
                        user_personal_info_id,
                        email,
                        phone
                    )
                VALUES(
                    ${user_personal_info.insertId},
                    '${social_information.email}',
                    '${social_information.phone}'
                )
            `);

            const [users] = await connection.execute(`
                INSERT INTO
                    users(
                        status_user_id,
                        user_personal_info_id,
                        email,
                        password
                    )
                VALUES(
                    2,
                    ${user_personal_info.insertId},
                    '${social_information.email}',
                    '${hash}'
                )
            `);

            const [user_has_roles] = await connection.execute(`
                INSERT INTO
                    user_has_roles(
                        users_id,
                        roles_id
                    )
                VALUES(
                    ${users.insertId},
                    ${rol.id}
                )
            `);
            
            result(null, users.insertId) 
        }else{
            result(error, null)
        }
        
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

module.exports = User;