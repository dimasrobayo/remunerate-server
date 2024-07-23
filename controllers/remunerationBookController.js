const RemunerationBook = require('../models/RemunerationBook');
const TypeLRE = require('../models/TypeLRE');

/**
 * Controller function to create a new record.
 */
const createRemunerationBook = async (request, response) => {
    try {
        const { type, code, description } = request.body;

        // Validate that the type exists
        const typeExists = await TypeLRE.query().findById(type);
        if (!typeExists) {
            return response.status(400).json({
                success: false,
                message: 'Type does not exist.'
            });
        }

        const newRecord = await RemunerationBook.query().insert({ type, code, description });
        return response.status(201).json({
            success: true,
            message: 'Record created successfully.',
            data: newRecord
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error creating record.',
            error: error.message
        });
    }
};

/**
 * Controller function to get all records.
 */
const getAllRemunerationBook = async (request, response) => {
    try {
        const records = await RemunerationBook.query().withGraphFetched('typeLRE');
        return response.status(200).json({
            success: true,
            message: 'List of all records.',
            data: records
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving records.',
            error: error.message
        });
    }
};

/**
 * Controller function to get by type records.
 */
const listbynottype = async (request, response) => {
    try {
        const { type } = request.params;
        
        const records = await RemunerationBook.query()
        .withGraphFetched('typeLRE')
        .whereNot('type', type);
        return response.status(200).json({
            success: true,
            message: 'List of all records.',
            data: records
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving records.',
            error: error.message
        });
    }
};

/**
 * Controller function to get all type LRE records.
 */
const getAllTypeLRE = async (request, response) => {
    try {
        const records = await TypeLRE.query();
        return response.status(200).json({
            success: true,
            message: 'List of all records.',
            data: records
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving records.',
            error: error.message
        });
    }
};

/**
 * Controller function to get a record by ID.
 */
const getRemunerationBookById = async (request, response) => {
    try {
        const { id } = request.params;
        const record = await RemunerationBook.query().findById(id).withGraphFetched('typeLRE');

        if (!record) {
            return response.status(404).json({
                success: false,
                message: 'Record not found.'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Record retrieved successfully.',
            data: record
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving record.',
            error: error.message
        });
    }
};

/**
 * Controller function to update a record by ID.
 */
const updateRemunerationBook = async (request, response) => {
    try {
        const { id } = request.params;
        const { type, code, description } = request.body;

        // Validate that the type exists
        if (type) {
            const typeExists = await TypeLRE.query().findById(type);
            if (!typeExists) {
                return response.status(400).json({
                    success: false,
                    message: 'Type does not exist.'
                });
            }
        }

        const updatedRecord = await RemunerationBook.query().patchAndFetchById(id, { type, code, description });

        if (!updatedRecord) {
            return response.status(404).json({
                success: false,
                message: 'Record not found.'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Record updated successfully.',
            data: updatedRecord
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating record.',
            error: error.message
        });
    }
};

/**
 * Controller function to delete a record by ID.
 */
const deleteRemunerationBook = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedRows = await RemunerationBook.query().deleteById(id);

        if (deletedRows === 0) {
            return response.status(404).json({
                success: false,
                message: 'Record not found.'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Record deleted successfully.'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error deleting record.',
            error: error.message
        });
    }
};

module.exports = {
    createRemunerationBook,
    getAllTypeLRE,
    listbynottype,
    getAllRemunerationBook,
    getRemunerationBookById,
    updateRemunerationBook,
    deleteRemunerationBook
};
