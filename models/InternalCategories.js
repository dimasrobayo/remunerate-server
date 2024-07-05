const { Model } = require('objection');
const BaseModel = require('./BaseModel');

/**
 * Model InternalCategory
 */
class InternalCategory extends BaseModel {

  /**
   * [required]
   * The table name for the InternalCategory model.
   * 
   * @returns {string} The table name for the InternalCategory model.
   */
  static get tableName() {
    return 'sys_internal_categories'; 
  }

  /**
   * [optional]
   * The primary key column for the InternalCategory model.
   * 
   * @returns {string} The primary key column for the InternalCategory model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The JSON schema for the InternalCategory model.
   * 
   * @returns {Object} The JSON schema for the InternalCategory model.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', maxLength: 45 },
        updated_at: { type: 'string', maxLength: 45 },
        deleted_at: { type: 'string', maxLength: 45 }
      }
    };
  }
}

module.exports = InternalCategory;
