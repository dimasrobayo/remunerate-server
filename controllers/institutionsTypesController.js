const InstitutionType = require('../models/InstitutionsTypes');

/**
 * Controller function to get all institution types.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getAllInstitutionsTypes = async (request, response) => {
    try {
        const data = await InstitutionType.query();
        return response.status(200).json({
            success: true,
            message: 'List of institution types.',
            data: data
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving institution types.',
            error: error.message
        });
    }
};

/**
 * Controller function to create a new institution type.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const createInstitutionType = async (request, response) => {
    const { name } = request.body;

    try {
        const newInstitutionType = await InstitutionType.query().insert({ name });
        return response.status(200).json({
            success: true,
            message: 'Institution type created successfully.',
            data: newInstitutionType
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error creating institution type.',
            error: error.message
        });
    }
};

/**
 * Controller function to update an institution type.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const updateInstitutionType = async (request, response) => {
    const { id, name } = request.body;

    try {
        const updatedInstitutionType = await InstitutionType.query().patchAndFetchById(id, { name });
        return response.status(200).json({
            success: true,
            message: 'Institution type updated successfully.',
            data: updatedInstitutionType
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating institution type.',
            error: error.message
        });
    }
};

/**
 * Controller function to delete an institution type.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const deleteInstitutionType = async (request, response) => {
    const id = request.params.id;
    const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

    try {
        const deletedInstitutionType = await InstitutionType.query().patchAndFetchById(id, {
            deleted_at: deletedAt
        });

        if (!deletedInstitutionType) {
            return response.status(404).json({
                success: false,
                message: 'Institution type not found.'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Institution type deleted successfully.'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error deleting institution type.',
            error: error.message
        });
    }
};

module.exports = {
    getAllInstitutionsTypes,
    createInstitutionType,
    updateInstitutionType,
    deleteInstitutionType
};
