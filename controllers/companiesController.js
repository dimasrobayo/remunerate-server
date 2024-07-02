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
        const companies = await Companies.query();
        response.status(200).json(companies);
    } catch (error) {
        response.status(500).json({ error: error.message });
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
        response.status(201).json(newCompany);
    } catch (error) {
        response.status(500).json({ error: error.message });
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
        response.status(200).json(updatedCompany);
    } catch (error) {
        response.status(500).json({ error: error.message });
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
        await Companies.query().patchAndFetchById(id, { deleted_at: new Date().toISOString() });
        response.status(200).json({ message: 'Company soft deleted successfully' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = {
    index,
    create,
    update,
    softDelete
};
