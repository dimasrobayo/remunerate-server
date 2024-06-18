const { orderBy } = require('lodash');
const dbSchool = require('../db');
const utils = {};

utils.getRegions = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const listRegions = await connection('sys_regions as sr')
        .select(
            'sr.*'
        )
        orderBy('sr.region');

        result(null, listRegions)
    } catch (error) {
        result(error, null);
    } finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

utils.communityByRegions = async (id, result) => {
    try {
        const connection = await dbSchool.getConnection();
        const listRegions = await connection('sys_regions as sr')
        .select(
            'sc.id',
            'sc.comuna',
            'sp.provincia',
            'sr.region'
        )
        .innerJoin('sys_provinces as sp', 'sr.id', 'sp.region_id')
        .innerJoin('sys_community as sc', 'sp.id', 'sc.provincia_id')
        .where('sr.id', id)
        orderBy('sc.comuna');

        result(null, listRegions)
    } catch (error) {
        result(error, null);
    } finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

utils.getCountries = async (result) => {
    try {
        const connection = await dbSchool.getConnection();
        const listCountries = await connection('sys_countries as sc')
        .select('sc.*')
        .orderBy('sc.name');

        result(null, listCountries)
    } catch (error) {
        result(error, null);
    } finally {
        // Cierra la conexión después de realizar las operaciones
        dbSchool.closeConnection();
    }
}

module.exports = utils;