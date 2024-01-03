const dbSchool = require('../db');
const utils = {};

utils.getRegions = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listRegions] = await connection.raw(`
            SELECT 
                sr.*
            FROM sys_regions AS sr
            ORDER BY sr.region
        `);

        result(null, listRegions)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getRegions')
        await dbSchool.closeConnection();
    }
}

utils.communityByRegions = async (id, result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listRegions] = await connection.raw(`
            SELECT 
                sc.id,
                sc.comuna,
                sp.provincia,
                sr.region
            FROM sys_regions AS sr
            JOIN sys_provinces sp ON sr.id = sp.region_id
            JOIN sys_community sc ON sp.id = sc.provincia_id
            WHERE sr.id = ${id}
            ORDER BY sc.comuna
        `);

        result(null, listRegions)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getRegions')
        await dbSchool.closeConnection();
    }
}

utils.getCountries = async (result) => {
    const connection = await dbSchool.getConnection();
    
    try {
        const [listRegions] = await connection.raw(`
            SELECT 
                sc.*
            FROM sys_countries AS sc
            ORDER BY sc.name
        `);

        result(null, listRegions)
    } catch (error) {
        console.error('Error fetching users from tenant database', error);
        result(error, null);
    }
    finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('Cierra la conexión después de getRegions')
        await dbSchool.closeConnection();
    }
}

module.exports = utils;