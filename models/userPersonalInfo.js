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
        const [createPersonalInfoId] = await connection(tableName).insert(
            {
                name: user.name,
                lastname: user.lastname,
                mother_lastname: user.mother_lastname,
                type_document: user.type_document,
                document_number:user.document_number,
                gender: user.gender,
                phone: user.phone,
                image: null
            }
        )
        return createPersonalInfoId;
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