const Concepts = require('../models/Concepts');
const Attributes = require('../models/Attributes');

/**
 * Controller function to get all concepts.
 */
const getAllConcepts = async (request, res) => {
  try {
    const concepts = await Concepts.query()
    .withGraphFetched('[attributes, internalCategory, remunerationBook, typesConcept]')
    .whereNull('deleted_at');
    
    return res.status(200).json({
      success: true,
      message: 'List of all concepts.',
      data: concepts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving concepts.',
      error: error.message
    });
  }
};

/**
 * Controller function to get a concept by ID.
 */
const getConceptById = async (request, res) => {
  try {
    const { id } = request.params;
    const concept = await Concepts.query()
    .findById(id)
    .withGraphFetched('[attributes]');

    if (!concept) {
      return res.status(404).json({
        success: false,
        message: 'Concept not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Concept retrieved successfully.',
      data: concept
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving concept.',
      error: error.message
    });
  }
};

/**
 * Controller function to create a new concept.
 */
const createConcept = async (request, res) => {
  try {
      const { attributes, ...conceptData } = request.body;
    
      const newConcept = await Concepts.query().insert(conceptData);
      
      if (attributes) {
          await Attributes.query().insert({
              ...attributes,
              sys_concepts_id: newConcept.id
          });
      }
        
      return res.status(200).json({
          success: true,
          message: 'Concept created successfully',
          data: newConcept
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: 'Error creating concept',
          error: error.message
      });
  }
};

/**
 * Controller function to update a concept by ID.
 */
const updateConcept = async (request, response) => {
  try {
    const { id } = request.params;
    console.log(request.body);
    const { attributes } = request.body;
    const updatedConcept = await Concepts.query().patchAndFetchById(id, request.body);

    if (!updatedConcept) {
      return response.status(404).json({
        success: false,
        message: 'Concept not found.'
      });
    }

    if (attributes) {
      await Attributes.query().patch(attributes).where('sys_concepts_id', id  );
    }

    return response.status(200).json({
      success: true,
      message: 'Concept updated successfully.',
      data: updatedConcept
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: 'Error updating concept.',
      error: error.message
    });
  }
};

/**
 * Controller function to delete a concept by ID.
 */
const deleteConcept = async (request, res) => {
  try {
    const { id } = request.params;
    const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const updatedRows = await Concepts.query().patchAndFetchById(id, { deleted_at: deletedAt });

    if (!updatedRows) {
      return res.status(404).json({
        success: false,
        message: 'Concept not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Concept soft deleted successfully.',
      data: updatedRows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error soft deleting concept.',
      error: error.message
    });
  }
};

/**
 * Controller function to create a new attribute.
 */
const createAttribute = async (request, res) => {
  try {
    const newAttribute = await Attributes.query().insert(request.body);
    return res.status(201).json({
      success: true,
      message: 'Attribute created successfully.',
      data: newAttribute
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating attribute.',
      error: error.message
    });
  }
};

/**
 * Controller function to get all attributes.
 */
const getAllAttributes = async (request, res) => {
  try {
    const attributes = await Attributes.query().withGraphFetched('concept');
    return res.status(200).json({
      success: true,
      message: 'List of all attributes.',
      data: attributes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving attributes.',
      error: error.message
    });
  }
};

/**
 * Controller function to get an attribute by ID.
 */
const getAttributeById = async (request, res) => {
  try {
    const { id } = request.params;
    const attribute = await Attributes.query().findById(id).withGraphFetched('concept');

    if (!attribute) {
      return res.status(404).json({
        success: false,
        message: 'Attribute not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Attribute retrieved successfully.',
      data: attribute
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving attribute.',
      error: error.message
    });
  }
};

/**
 * Controller function to update an attribute by ID.
 */
const updateAttribute = async (request, res) => {
  try {
    const { id } = request.params;
    const updatedAttribute = await Attributes.query().patchAndFetchById(id, request.body);

    if (!updatedAttribute) {
      return res.status(404).json({
        success: false,
        message: 'Attribute not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Attribute updated successfully.',
      data: updatedAttribute
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating attribute.',
      error: error.message
    });
  }
};

/**
 * Controller function to delete an attribute by ID.
 */
const deleteAttribute = async (request, res) => {
    try {
        const { id } = request.params;
        const deletedRows = await Attributes.query().deleteById(id);

        if (deletedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Attribute not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Attribute deleted successfully.'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting attribute.',
            error: error.message
        });
    }
};

module.exports = {
    createConcept,
    getAllConcepts,
    getConceptById,
    updateConcept,
    deleteConcept,
    createAttribute,
    getAllAttributes,
    getAttributeById,
    updateAttribute,
    deleteAttribute
};
