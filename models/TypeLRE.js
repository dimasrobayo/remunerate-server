const BaseModel = require('./BaseModel');

/**
 * Model for the sys_types_lre table.
 */
class TypeLRE extends BaseModel {

  /**
   * [required]
   * The table name for the model.
   * 
   * @returns {string} The table name for the model.
   */
  static get tableName() {
    return 'sys_types_lre';
  }

  /**
   * [optional]
   * The primary key column for the model.
   * 
   * @returns {string} The primary key column for the model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * JSON schema for validation.
   * 
   * @returns {Object} The JSON schema for validation.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        description: { type: 'string', maxLength: 45 },
        create_at: { type: 'string', format: 'date-time' },
        update_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = TypeLRE;