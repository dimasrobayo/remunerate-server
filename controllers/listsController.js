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
        const lists = await Lists.query().withGraphFetched('values').orderBy('name');
        
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
 * Controller function to get all lists.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getOnlyLists = async (request, response) => {
    try {
        const lists = await Lists.query().orderBy('name');
        
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
    const { id } = request.params;

    try {
        const list = await ValuesLists.query().findById(id);
        
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
 * Controller function to get all lists.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getListValuesById = async (request, response) => {
    try {
        const { id } = request.params;
        
        // Verificar que el ID esté presente
        if (!id) {
            return response.status(400).json({
                success: false,
                message: 'ID de la lista es requerido.'
            });
        }
        
        // Consultar la lista específica por ID junto con sus valores asociados
        const list = await Lists.query()
            .findById(id)
            .withGraphFetched('values')
            .modifyGraph('values', builder => {
                builder.whereNull('deleted_at');
            });
        
        // Verificar que la lista exista
        if (!list) {
            return response.status(404).json({
                success: false,
                message: 'Lista no encontrada.'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Listado de la lista.',
            data: list
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
 * Controller function to create a new list.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const createList = async (request, response) => {
    try {
        const newList = await ValuesLists.query().insert(request.body);

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
    const { id } = request.params;
    const { sys_lists_id, item, name, value_a, value_b, value_c } = request.body;

    try {
        // Verificar que el registro existe antes de intentar actualizarlo
        const valueList = await ValuesLists.query().findById(id);
        if (!valueList) {
            return response.status(404).json({
                success: false,
                message: 'Lista no encontrada.'
            });
        }

        // Realizar la actualización
        const updatedValueList = await ValuesLists.query().patchAndFetchById(id, {
            item,
            name,
            value_a,
            value_b,
            value_c
        });

        return response.status(200).json({
            success: true,
            message: 'Lista actualizada con exito.',
            data: updatedValueList
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
    const { id } = request.params;
    const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

    try {
        const deletedList = await ValuesLists.query().findById(id).patch({ deleted_at: deletedAt });
        
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
    getOnlyLists,
    getListById,
    getListValuesById,
    createList,
    updateList,
    deleteList
};
