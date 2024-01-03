const dbSchool = require('../db');
const sys_files = {};
const tableName = 'sys_files';



sys_files.getSysFilesById = async (id) => {
    const connection = await dbSchool.getConnection();
    
    try {
        //await connection.raw(`SELECT * FROM sys_files where id = 25 and deleted_at is null`);
        const [sysFile] = await connection.select('*').from(tableName).where('id', id).whereNull('deleted_at')
        return sysFile;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getSysFilesById')
        //await dbSchool.closeConnection();
    }
}



sys_files.create = async (file, result) => {
    const connection = await dbSchool.getConnection();
    try {
        // INSERT INTO `sys_files` (`id`, `name`, `path`, `moduleName`, `upload_by`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'ss', 'ss', 'ss', '1', NULL, NULL, NULL);
        const [createTypeTeaching] = await connection.raw(`
            INSERT INTO ${tableName}(
                name,
                path,
                moduleName,
                upload_by
            )VALUES(
                '${file.name}',
                '${file.path}',
                '${file.moduleName}',
                '${file.upload_by}'
            )
        `)

        return createTypeTeaching.insertId;
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        return null;
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de sys_files create')
        await dbSchool.closeConnection();
    }
}

sys_files.update = async (id) =>{
    const connection = await dbSchool.getConnection();
    
    try {
        //await connection.raw(`SELECT * FROM sys_files where id = 25 and deleted_at is null`);
        const sysFile = await connection.from(tableName).where('id', id)
            .update({
                deleted_at: new Date(),
                updated_at: new Date(),

            })
        
        
        return sysFile;
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

sys_files.delete = async (id, result) => {
    const connection = await dbSchool.getConnection();

    try {
        const [editTypeTeaching] = await connection.raw(`
            DELETE FROM ${tableName} WHERE id = ${id}
        `)
        result(null, id);
    } catch (error) {
        console.error('Error fetching sys_files from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de Teaching delete')
        await dbSchool.closeConnection();
    }
}

module.exports = sys_files;