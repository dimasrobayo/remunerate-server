const TypesConcept = require('../models/TypesConcepts');

/**
 * Controller function to get all types concepts.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getAllTypesConcepts = async (request, response) => {
  try {
    const typesConcepts = await TypesConcept.query().whereNull('deleted_at');
    return response.status(200).json({
      success: true,
      data: typesConcepts
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error fetching types concepts.',
      error: error.message
    });
  }
};

/**
 * Controller function to get a type concept by ID.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getTypeConceptById = async (request, response) => {
  const { id } = request.params;
  try {
    const typeConcept = await TypesConcept.query().findById(id).whereNull('deleted_at');
    if (!typeConcept) {
      return response.status(404).json({
        success: false,
        message: 'Type concept not found.'
      });
    }
    return response.status(200).json({
      success: true,
      data: typeConcept
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error fetching type concept.',
      error: error.message
    });
  }
};

/**
 * Controller function to create a new type concept.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const createTypeConcept = async (request, response) => {
  const { name } = request.body;
  try {
    const newTypeConcept = await TypesConcept.query().insert({
      name
    });
    return response.status(200).json({
      success: true,
      message: 'Type concept created successfully.',
      data: newTypeConcept
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error creating type concept.',
      error: error.message
    });
  }
};

/**
 * Controller function to update a type concept.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const updateTypeConcept = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  try {
    const updatedTypeConcept = await TypesConcept.query().patchAndFetchById(id, {
      name
    });
    if (!updatedTypeConcept) {
      return response.status(404).json({
        success: false,
        message: 'Type concept not found.'
      });
    }
    return response.status(200).json({
      success: true,
      message: 'Type concept updated successfully.',
      data: updatedTypeConcept
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error updating type concept.',
      error: error.message
    });
  }
};

/**
 * Controller function to delete (soft delete) a type concept.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const deleteTypeConcept = async (request, response) => {
    const { id } = request.params;
    const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

    try {
        const deletedTypeConcept = await TypesConcept.query().patchAndFetchById(id, {
            deleted_at: deletedAt
        });

        if (!deletedTypeConcept) {
            return response.status(404).json({
                success: false,
                message: 'Type concept not found.'
            });
        }
        return response.status(200).json({
            success: true,
            message: 'Type concept deleted successfully.',
            data: deletedTypeConcept
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error deleting type concept.',
            error: error.message
        });
    }
};

module.exports = {
  getAllTypesConcepts,
  getTypeConceptById,
  createTypeConcept,
  updateTypeConcept,
  deleteTypeConcept
};
