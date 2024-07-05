const CajaCompensacion = require('../models/CajaCompensacion');

/**
 * Controller function to handle getting all CajaCompensacion.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const index = async (request, response) => {
    try {
        const cajaCompensacion = await CajaCompensacion.query();

        return response.status(200).json({
            success: true,
            message: 'Listado de cajas de compensación!',
            data: cajaCompensacion
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle creating a new CajaCompensacion.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const create = async (request, response) => {
    try {
        const newCajaCompensacion = await CajaCompensacion.query().insert(request.body);
        response.status(201).json(newCajaCompensacion);
        return response.status(200).json({
            success: true,
            message: 'Cajas de compensación creada con exito!',
            data: newCajaCompensacion
        });
    } catch (error) {
        response.status(500).json({ error: error.message });
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle updating an existing CajaCompensacion.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const update = async (request, response) => {
    try {
        const { id, ...cajaCompensacionData } = request.body;
        const updatedCajaCompensacion = await CajaCompensacion.query().patchAndFetchById(id, cajaCompensacionData);

        return response.status(200).json({
            success: true,
            message: 'Cajas de compensación actualizada con exito!',
            data: updatedCajaCompensacion
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle soft deleting a CajaCompensacion.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const softDelete = async (request, response) => {
    try {
        const { id } = request.body;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'
        
        await CajaCompensacion.query().patchAndFetchById(id, { deleted_at: deletedAt });

        return response.status(200).json({
            success: true,
            message: 'CajaCompensacion Eliminada con exito'
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
