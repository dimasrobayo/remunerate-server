const Region = require('../models/Region');
const Community = require('../models/Community');
const Country = require('../models/Country');
const Province = require('../models/Province');

/**
 * Controller function to get the list of regions.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const regions = async (request, response) => {
    try {
        const data = await Region.query();
        return response.status(200).json({
            success: true,
            message: 'Listado de regiones.',
            data: data
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error con listado de regiones',
            error: 'Algo salio mal!'
        });
    }
};

/**
 * Controller function to get the list of communities by region ID.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const communityByRegions = async (request, response) => {
    const id = request.params.id;

    try {
        const data = await Community.query()
            .joinRelated('province')
            .where('province.region_id', id)
            .select('sys_community.*');

        return response.status(200).json({
            success: true,
            message: 'Listado de comunas.',
            data: data
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error con listado de comunas',
            error: 'Algo salio mal!'
        });
    }
};

/**
 * Controller function to get the list of countries.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const countries = async (request, response) => {
    try {
        const data = await Country.query();
        return response.status(200).json({
            success: true,
            message: 'Listado de paises.',
            data: data
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error con listado de paises',
            error: 'Algo salio mal!'
        });
    }
};

module.exports = {
    regions,
    communityByRegions,
    countries
};