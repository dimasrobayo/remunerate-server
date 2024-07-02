const BaseModel = require('./BaseModel');

/**
 * Model CajaCompensacion
 */
class CajaCompensacion extends BaseModel {

  /**
   * [required]
   * The table name for the CajaCompensacion model.
   * 
   * @returns {string} The table name for the CajaCompensacion model.
   */
  static get tableName() {
    return 'sys_caja_compensacion'; 
  }
  
  /**
   * The JSON schema for validation.
   * 
   * @returns {object} The JSON schema for validation.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = CajaCompensacion;