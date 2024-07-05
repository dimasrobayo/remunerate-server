const { Model } = require('objection');
const BaseModel = require('./BaseModel');

/**
 * Model TypesConcept
 */
class TypesConcept extends BaseModel {

  /**
   * [required]
   * The table name for the TypesConcept model.
   * 
   * @returns {string} The table name for the TypesConcept model.
   */
  static get tableName() {
    return 'sys_types_concepts';
  }

  /**
   * [optional]
   * The primary key column for the TypesConcept model.
   * 
   * @returns {string} The primary key column for the TypesConcept model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The JSON schema for the TypesConcept model.
   * 
   * @returns {Object} The JSON schema for the TypesConcept model.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: 'string', format: 'date-time', nullable: true }
      }
    };
  }
}

module.exports = TypesConcept;
