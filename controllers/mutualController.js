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

        return response.status(200).json({
            success: true,
            message: 'Listado de mutual!',
            data: mutual
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
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
        return response.status(200).json({
            success: true,
            message: 'Mutual creada con exito!',
            data: newMutual
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
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

        return response.status(200).json({
            success: true,
            message: 'Mutual actualiada con exito!',
            data: updatedMutual
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
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

        return response.status(200).json({
            success: true,
            message: 'Mutual eliminada con exito!'
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
