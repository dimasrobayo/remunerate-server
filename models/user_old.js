const bcrypt = require('bcryptjs');
const dbSchool = require('../db');
const User = {};

User.findById = async (id, result) => {
    let connection;

    try {
        connection = await dbSchool.getConnection();
        
        const [user] = await connection.raw(`
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
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
}

User.findByEmail = async(email, result) => {
    let connection;

    try {
        connection = await dbSchool.getConnection();
        
        const [user] = await connection.raw(`
        SELECT 
            u.id,
            upi.id as id_user_personal_info,
            upi.name,
            upi.lastname,
            upi.mother_lastname,
            upi.type_document,
            upi.document_number,
            su.description AS status,
            u.email,
            u.my_color,
            u.grayscale,
            upi.gender,
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
        INNER JOIN status_users AS su ON su.id = u.status_user_id
        WHERE u.email = '${email}' and u.status_user_id = 1
        GROUP BY u.id
        `);
        
        if(user[0]){
            const [civilian_information] = await connection.raw(`
                SELECT 
                    uci.*, 
                    DATE_FORMAT(uci.birthdate, '%Y-%m-%d') AS birthdate
                FROM user_civilian_information AS uci
                WHERE uci.user_personal_info_id = ${user[0].id_user_personal_info}
            `);

            const [social_information] = await connection.raw(`
                SELECT 
                    usi.*
                FROM user_social_information AS usi
                WHERE usi.user_personal_info_id = ${user[0].id_user_personal_info}
            `);

            const [health_information] = await connection.raw(`
                SELECT 
                    uhi.*
                FROM user_health_information AS uhi
                WHERE uhi.user_personal_info_id = ${user[0].id_user_personal_info}
            `);

            const [address_information] = await connection.raw(`
                SELECT 
                    ua.*
                FROM user_addresses AS ua
                INNER JOIN user_addresses_personal_info AS uapi ON ua.id = uapi.address_id
                WHERE uapi.user_personal_info_id = ${user[0].id_user_personal_info}
            `);

            user[0]['civilian_information'] = civilian_information[0] ? civilian_information[0] : {};
            user[0]['social_information'] = social_information[0] ? social_information[0] : {};;
            user[0]['health_information'] = health_information[0] ? health_information[0] : {};;
            user[0]['address_information'] = address_information ? address_information : {};;
        }
        
        result(null, user[0])
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de realiza')
        //await dbSchool.closeConnection();
    }
}

User.register = async (user, result) => {
    let connection;
    const hash = await bcrypt.hash(user.password, 10);

    try {
        connection = await dbSchool.getConnection();
        
        const [user_personal_info] = await connection.raw(`
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

        const [user_social_information] = await connection.raw(`
                INSERT INTO
                user_social_information(
                    user_personal_info_id,
                    email,
                    phone
                )VALUES(
                    ${user_personal_info.insertId},
                    '${user.email}',
                    '${user.phone}'
                )
        `)

        const [users] = await connection.raw(`
            INSERT INTO
            users(
                status_user_id,
                user_personal_info_id,
                email,
                password
            )VALUES(
                2, 
                ${user_personal_info.insertId},
                '${user.email}',
                '${hash}'
            )
        `);

        const [user_has_roles] = await connection.raw(`
            INSERT INTO
                user_has_roles(
                    users_id,
                    roles_id
                )
            VALUES(
                ${users.insertId},
                ${user.rol}
            )
        `);
        
        result(null, users.insertId)   
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de realizar el register')
        //await dbSchool.closeConnection();
    }
}

User.registerWithImage = async (user, result) => {
    let connection;
    const {addresses, health_information, social_information, rol} = user;
    const hash = await bcrypt.hash(user.password, 10);
    
    try {
        connection = await dbSchool.getConnection();
        
        const [validateInfo] = await connection.raw(`
            SELECT 
                upi.document_number
            FROM 
                user_personal_info AS upi
            WHERE 
                upi.document_number = '${user.document_number}'
        `);

        if(validateInfo.length === 0) {
            const [user_personal_info] = await connection.raw(`
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

            const [user_addresses] = await connection.raw(`
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

            const [user_addresses_personal_info] = await connection.raw(`
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

            const [user_health_information] = await connection.raw(`
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

            const [user_social_information] = await connection.raw(`
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

            const [users] = await connection.raw(`
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

            const [user_has_roles] = await connection.raw(`
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
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de realizar el register with image')
        //await dbSchool.closeConnection();
    }
}

User.findByUsers = async (result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [user] = await connection.raw(`
        SELECT 
            u.id,
            upi.name,
            upi.lastname,
            u.email,
            upi.phone,
            upi.image
        FROM users AS u
        INNER JOIN user_has_roles AS uhr ON uhr.users_id = u.id
        INNER JOIN roles AS r ON r.id = uhr.roles_id
        INNER JOIN user_personal_info AS upi ON upi.id = u.user_personal_info_id
        GROUP BY u.id
        `);
        
        result(null, user)
    } catch (error) {
        console.error('Error fetching users from tenant database', err);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de findByUsers')
        //await dbSchool.closeConnection();
    }
}

User.findUsersById = async (id, result) => {
    let connection;

    try {
        connection = await dbSchool.getConnection();
        
        const [user] = await connection.raw(`
        SELECT 
            u.id,
            upi.id as id_user_personal_info,
            upi.name,
            upi.lastname,
            upi.mother_lastname,
            upi.type_document,
            upi.document_number,
            su.description AS status,
            u.email,
            upi.gender,
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
        INNER JOIN status_users AS su ON su.id = u.status_user_id
        WHERE u.id = ${id} and u.status_user_id = 1
        GROUP BY u.id
        `);

        if(user[0]){
            const [civilian_information] = await connection.raw(`
                SELECT 
                    uci.*
                FROM user_civilian_information AS uci
                WHERE uci.user_personal_info_id = ${user[0].id_user_personal_info}
            `);

            const [social_information] = await connection.raw(`
                SELECT 
                    usi.*
                FROM user_social_information AS usi
                WHERE usi.user_personal_info_id = ${user[0].id_user_personal_info}
            `);

            const [health_information] = await connection.raw(`
                SELECT 
                    uhi.*
                FROM user_health_information AS uhi
                WHERE uhi.user_personal_info_id = ${user[0].id_user_personal_info}
            `);

            const [address_information] = await connection.raw(`
                SELECT 
                    ua.*
                FROM user_addresses AS ua
                INNER JOIN user_addresses_personal_info AS uapi ON ua.id = uapi.address_id
                WHERE uapi.user_personal_info_id = ${user[0].id_user_personal_info}
            `);

            user[0]['civilian_information'] = civilian_information;
            user[0]['social_information'] = social_information;
            user[0]['health_information'] = health_information;
            user[0]['address_information'] = address_information;
        }
        
        result(null, user[0])
    } catch (error) {
        console.error('Error fetching users from tenant database', err);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de findUsersById')
        //await dbSchool.closeConnection();
    }
}

User.updateWithOutImage = async (user, result) => {
    let connection;
    const {health_information, social_information, civilian_information, roles} = user;
    
    try {
        connection = await dbSchool.getConnection();
        
        //await connection.beginTransaction();
        await connection.transaction(async trx => {
            // UPDATE PERSONAL INFO SESSION
            const [user_personal_info] = await connection.raw(`
                INSERT INTO
                user_personal_info(
                    name,
                    lastname,
                    mother_lastname,
                    type_document,
                    document_number,
                    gender,
                    phone
                )VALUES(
                    '${user.name}', 
                    '${user.lastname}', 
                    '${user.mother_lastname}', 
                    '${user.type_document}', 
                    '${user.document_number}', 
                    '${user.gender}', 
                    '${user.phone}'
                )ON DUPLICATE KEY UPDATE
                    name = VALUES(name), 
                    lastname = VALUES(lastname), 
                    mother_lastname = VALUES(mother_lastname),
                    type_document = VALUES(type_document), 
                    document_number = VALUES(document_number), 
                    gender = VALUES(gender), 
                    phone = VALUES(phone)
            `);

            // UPDATE CIVILIAN INFO SESSION
            const [getUserCivilianInformation] = await connection.raw(`
                SELECT 
                    * 
                FROM 
                    user_civilian_information 
                WHERE 
                    user_personal_info_id = ${user.id}
            `);
            
            if(getUserCivilianInformation.length > 0){
                const [user_civilian_information] = await connection.raw(`
                    UPDATE user_civilian_information
                    SET
                        user_personal_info_id = ${user.id},
                        birthdate = '${civilian_information.birthdate}',
                        country_birth = '${civilian_information.country_birth}',
                        nationality = '${civilian_information.nationality}',
                        updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                    WHERE
                    user_personal_info_id = ${user.id}
                `);
            }else{
                const [user_civilian_information] = await connection.raw(`
                    INSERT INTO
                    user_civilian_information(
                        user_personal_info_id,
                        birthdate,
                        country_birth,
                        nationality
                    )VALUES(
                        ${user.id},
                        '${civilian_information.birthdate}',
                        '${civilian_information.country_birth}',
                        '${civilian_information.nationality}'
                    )
                `); 

                user.civilian_information.id = user_civilian_information.insertId;
            }

            // UPDATE HEALTH INFORMATION SESSION
            const [getUserHealthInformation] = await connection.raw(`
                SELECT 
                    * 
                FROM 
                    user_health_information 
                WHERE 
                    user_personal_info_id = ${user.id}
            `);

            if(getUserHealthInformation.length > 0){
                const [user_health_information] = await connection.raw(`
                    UPDATE user_health_information
                    SET
                        blood_type = '${health_information.blood_type}',
                        allergy = '${health_information.allergy}',
                        observation = '${health_information.observation}',
                        updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                    WHERE
                        user_personal_info_id = ${user.id}
                `)
            }else{
                const [user_health_information] = await connection.raw(`
                    INSERT INTO
                    user_health_information(
                        user_personal_info_id,
                        blood_type,
                        allergy,
                        observation
                    )VALUES(
                        ${user.id},
                        '${health_information.blood_type}',
                        '${health_information.allergy}',
                        '${health_information.observation}'
                    )
                `);

                user.health_information.id = user_health_information.insertId;
            }

            // UPDATE SOCIAL INFO SESSION
            const [getUserSocialInformation] = await connection.raw(`
                SELECT 
                    * 
                FROM 
                    user_social_information 
                WHERE 
                    user_personal_info_id = ${user.id}
            `);

            if(getUserSocialInformation.length > 0){
                const [user_social_information] = await connection.raw(`
                    UPDATE user_social_information
                    SET
                        email = '${social_information.email}',
                        phone = '${social_information.phone}',
                        updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                    WHERE
                        user_personal_info_id = ${user.id}
                `);
            }else{
                const [user_social_information] = await connection.raw(`
                    INSERT INTO
                    user_social_information(
                        user_personal_info_id,
                        email,
                        phone
                    )VALUES(
                        ${user.id},
                        '${social_information.email}',
                        '${social_information.phone}'
                    )
                `);

                user.social_information.id = user_social_information.insertId;
            }

            // UPDATE USER INFO SESSION
            const [users] = await connection.raw(`
                UPDATE users
                SET
                    email  = '${social_information.email}',
                    my_color = '${user.myColor}',
                    updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                WHERE
                    id = ${user.id}
            `);
        //await connection.commit();
        });
        result(null, user);
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de updateWithOutImage')
        //await dbSchool.closeConnection();
    }
} 

module.exports = User;