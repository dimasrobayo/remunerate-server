const Mutual = require('../models/Mutual');

/**
 * Controller function to handle getting all mutual.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const index = async (request, response) => {
    try {
        const mutual = await Mutual.query();
        response.status(200).json(mutual);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

/**
 * Controller function to handle creating a new mutual.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const create = async (request, response) => {
    try {
        const newMutual = await Mutual.query().insert(request.body);
        response.status(201).json(newMutual);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

/**
 * Controller function to handle updating an existing mutual.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const update = async (request, response) => {
    try {
        const { id, ...mutualData } = request.body;
        const updatedMutual = await Mutual.query().patchAndFetchById(id, mutualData);
        response.status(200).json(updatedMutual);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

/**
 * Controller function to handle soft deleting a mutual.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const softDelete = async (request, response) => {
    try {
        const { id } = request.body;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

        await Mutual.query().patchAndFetchById(id, { deleted_at: deletedAt });
        response.status(200).json({ message: 'Mutual eliminada con exito!' });
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
