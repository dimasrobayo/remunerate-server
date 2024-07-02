const BaseModel = require('./BaseModel');

/**
 * Model Mutual
 */
class Mutual extends BaseModel {

  /**
   * [required]
   * The table name for the Mutual model.
   * 
   * @returns {string} The table name for the Mutual model.
   */
  static get tableName() {
    return 'sys_mutual'; 
  }
  
  /**
   * The JSON schema for validation.
   * 
   * @returns {object} The JSON schema for validation.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = Mutual;