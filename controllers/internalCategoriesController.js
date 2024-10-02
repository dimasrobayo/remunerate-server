const InternalCategory = require('../models/InternalCategories');

/**
 * Controller function to get all internal categories.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getAllInternalCategories = async (request, response) => {
  try {
    const internalCategories = await InternalCategory.query().whereNull('deleted_at');
    return response.status(200).json({
      success: true,
      data: internalCategories
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error fetching internal categories.',
      error: error.message
    });
  }
};

/**
 * Controller function to get an internal category by ID.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getInternalCategoryById = async (request, response) => {
  const { id } = request.params;
  try {
    const internalCategory = await InternalCategory.query().findById(id).whereNull('deleted_at');
    if (!internalCategory) {
      return response.status(404).json({
        success: false,
        message: 'Internal category not found.'
      });
    }
    return response.status(200).json({
      success: true,
      data: internalCategory
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error fetching internal category.',
      error: error.message
    });
  }
};

/**
 * Controller function to create a new internal category.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const createInternalCategory = async (request, response) => {
  const { name } = request.body;
  try {
    const newInternalCategory = await InternalCategory.query().insert({
      name
    });
    return response.status(200).json({
      success: true,
      message: 'Internal category created successfully.',
      data: newInternalCategory
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error creating internal category.',
      error: error.message
    });
  }
};

/**
 * Controller function to update an internal category.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const updateInternalCategory = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  try {
    const updatedInternalCategory = await InternalCategory.query().patchAndFetchById(id, {
      name
    });

    if (!updatedInternalCategory) {
      return response.status(404).json({
        success: false,
        message: 'Internal category not found.'
      });
    }
    
    return response.status(200).json({
      success: true,
      message: 'Internal category updated successfully.',
      data: updatedInternalCategory
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error updating internal category.',
      error: error.message
    });
  }
};

/**
 * Controller function to delete (soft delete) an internal category.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const deleteInternalCategory = async (request, response) => {
  const { id } = request.params;
  const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

  try {
    const deletedInternalCategory = await InternalCategory.query().patchAndFetchById(id, {
      deleted_at: deletedAt
    });
    
    if (!deletedInternalCategory) {
      return response.status(404).json({
        success: false,
        message: 'Internal category not found.'
      });
    }
    return response.status(200).json({
      success: true,
      message: 'Internal category deleted successfully.',
      data: deletedInternalCategory
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error deleting internal category.',
      error: error.message
    });
  }
};

module.exports = {
  getAllInternalCategories,
  getInternalCategoryById,
  createInternalCategory,
  updateInternalCategory,
  deleteInternalCategory
};
