const BaseModel = require('./BaseModel');

/**
 * Model Country
 */
class Country extends BaseModel {

  /**
   * [required]
   * The table name for the Country model.
   * 
   * @returns {string} The table name for the Country model.
   */
  static get tableName() {
    return 'sys_countries';
  }

  /**
   * [optional]
   * The primary key column for the Country model.
   * 
   * @returns {string} The primary key column for the Country model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The JSON schema for validating Country model properties.
   * 
   * @returns {object} The JSON schema for the Country model.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['phone_code'],
      properties: {
        id: { type: 'integer' },
        iso: { type: 'string', maxLength: 2 },
        name: { type: 'string', maxLength: 80 },
        phone_code: { type: 'integer' }
      }
    };
  }
}

module.exports = Country;