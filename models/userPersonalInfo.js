const dbSchool = require('../db');
const user_personal_info = {};
const tableName = 'user_personal_info';


user_personal_info.getByDocumentNumber = async (document_number,connection_trx) => {
    //const connection = await dbSchool.getConnection();
    const connection = connection_trx;
    
    try {
        const [sysFile] = await connection.select('*').from(tableName).where('document_number', document_number).whereNull('deleted_at')
        return sysFile;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de user_personal_info')
        //await dbSchool.closeConnection();
    }
}

user_personal_info.create = async (user,connection_trx) => {
    //const connection = await dbSchool.getConnection();
    const connection = connection_trx;
    try {
        const [user_personal_info] = await connection.raw(`
            INSERT INTO
            user_personal_info(
                name,
                lastname,
                mother_lastname,
                type_document,
                document_number,
                gender,
                phone,
                image
            ) VALUES (
                '${user.name}', 
                '${user.lastname}', 
                '${user.mother_lastname}', 
                '${user.type_document}', 
                '${user.document_number}', 
                '${user.gender}', 
                '${user.phone}',
                '${user.image}'
            ) ON DUPLICATE KEY UPDATE
                name = VALUES(name), 
                lastname = VALUES(lastname), 
                mother_lastname = VALUES(mother_lastname),
                type_document = VALUES(type_document), 
                document_number = VALUES(document_number), 
                gender = VALUES(gender), 
                phone = VALUES(phone),
                image = VALUES(image),
                id = LAST_INSERT_ID(id)
        `);
        //console.log(user_personal_info)
        return user_personal_info.insertId;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        //console.log('Cierra la conexión después de user_personal_info create')
        //await dbSchool.closeConnection();
    }
}

module.exports = user_personal_info;