const Institution = require('../models/Institutions');
const InstitutionType = require('../models/InstitutionsTypes');


/**
 * Controller function to get all institutions.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getAllInstitutions = async (request, response) => {
    try {
        const data = await InstitutionType.query().withGraphFetched('institutions');

        return response.status(200).json({
            success: true,
            message: 'List of institutions.',
            data: data
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving institutions.',
            error: error.message
        });
    }
};

/**
 * Controller function to get an institution by ID.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getInstitutionById = async (request, response) => {
    const { id } = request.params;
    try {
        const institution = await Institution.query().findById(id);

        if (!institution) {
            return response.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Institution found.',
            data: institution
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving institution.',
            error: error.message
        });
    }
};

/**
 * Controller function to create a new institution.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const createInstitution = async (request, response) => {
    const { sys_details_institutions_id, rut_institution, name, value, aditional_data, equivalencia_previred } = request.body;

    try {
        const newInstitution = await Institution.query().insert({
            sys_details_institutions_id,
            rut_institution,
            name,
            value,
            aditional_data,
            equivalencia_previred
        });
        return response.status(200).json({
            success: true,
            message: 'Institution created successfully.',
            data: newInstitution
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error creating institution.',
            error: error.message
        });
    }
};

/**
 * Controller function to update an institution.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const updateInstitution = async (request, response) => {
    const { id } = request.params;
    const { sys_details_institutions_id, rut_institution, name, value, aditional_data, equivalencia_previred } = request.body;

    try {
        const updatedInstitution = await Institution.query().patchAndFetchById(id, {
            sys_details_institutions_id,
            rut_institution,
            name,
            value,
            aditional_data,
            equivalencia_previred
        });

        return response.status(200).json({
            success: true,
            message: 'Institution updated successfully.',
            data: updatedInstitution
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating institution.',
            error: error.message
        });
    }
};

/**
 * Controller function to delete an institution.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const deleteInstitution = async (request, response) => {
    const { id } = request.params;
    const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

    try {
        const deletedInstitution = await Institution.query().patchAndFetchById(id, {
            deleted_at: deletedAt
        });

        if (!deletedInstitution) {
            return response.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Institution deleted successfully.'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error deleting institution.',
            error: error.message
        });
    }
};

module.exports = {
    getAllInstitutions,
    getInstitutionById,
    createInstitution,
    updateInstitution,
    deleteInstitution
};
