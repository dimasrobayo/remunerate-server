const Lists = require('../models/Lists');
const ValuesLists = require('../models/ValuesLists');

/**
 * Controller function to get all lists.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getAllLists = async (request, response) => {
    try {
        const lists = await Lists.query().withGraphFetched('values');
        
        return response.status(200).json({
            success: true,
            message: 'Listado de listas.',
            data: lists
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error al recuperar la lista.',
            error: error.message
        });
    }
};

/**
 * Controller function to get a list by ID.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getListById = async (request, response) => {
    const id = request.params.id;

    try {
        const list = await Lists.query().findById(id).withGraphFetched('values');
        
        if (!list) {
            return response.status(404).json({
                success: false,
                message: 'Lista no encontrada.'
            });
        }
        
        return response.status(200).json({
            success: true,
            message: 'Lista encontrada con exito.',
            data: list
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving list.',
            error: error.message
        });
    }
};

/**
 * Controller function to create a new list.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const createList = async (request, response) => {
    const { name, values } = request.body;

    try {
        const newList = await Lists.query().insertGraphAndFetch({
            name,
            values
        });

        return response.status(200).json({
            success: true,
            message: 'Lista creada con exito.',
            data: newList
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error creando la lista.',
            error: error.message
        });
    }
};

/**
 * Controller function to update a list by ID.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const updateList = async (request, response) => {
    const { id, name, values } = request.body;

    try {
        const updatedList = await Lists.query().upsertGraphAndFetch({
            id,
            name,
            values
        });

        return response.status(200).json({
            success: true,
            message: 'Lista actualizada con exito.',
            data: updatedList
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error actualizando la lista.',
            error: error.message
        });
    }
};

/**
 * Controller function to delete a list by ID.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const deleteList = async (request, response) => {
    const { id } = request.body;
    const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

    try {
        const deletedList = await Lists.query().findById(id).patch({ deleted_at: deletedAt });
        
        if (!deletedList) {
            return response.status(404).json({
                success: false,
                message: 'Lista no encontrada.'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'List eliminada con exito.'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error eliminando lista.',
            error: error.message
        });
    }
};

module.exports = {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteList
};
