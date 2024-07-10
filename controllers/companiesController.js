const Companies = require('../models/Companies');

/**
 * Controller function to handle getting all companies.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const index = async (request, response) => {
    try {
        const companies = await Companies.query()
        .withGraphFetched('[ccaf, mutual]');

        return response.status(200).json({
            success: true,
            message: 'Listado de empresa!',
            data: companies
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle creating a new company.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const create = async (request, response) => {
    try {
        const newCompany = await Companies.query().insert(request.body);

        return response.status(200).json({
            success: true,
            message: 'Empresa creada con exito!',
            data: newCompany
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle updating an existing company.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const update = async (request, response) => {
    try {
        const { id, ...companyData } = request.body;
        const updatedCompany = await Companies.query().patchAndFetchById(id, companyData);

        return response.status(200).json({
            success: true,
            message: 'Empresa actualizada con exito!',
            data: updatedCompany
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle soft deleting a company.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const softDelete = async (request, response) => {
    try {
        const { id } = request.body;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

        await Companies.query().patchAndFetchById(id, { deleted_at: deletedAt });

        return response.status(200).json({
            success: true,
            message: 'Empresa Eliminada con exito!'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    index,
    create,
    update,
    softDelete
};
