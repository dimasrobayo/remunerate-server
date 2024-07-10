const { Model } = require('objection');
const BaseModel = require('./BaseModel');

/**
 * Model for sys_institutions_types
 */
class InstitutionType extends BaseModel {

  /**
   * [required]
   * The table name for the InstitutionType model.
   * 
   * @returns {string} The table name for the InstitutionType model.
   */
  static get tableName() {
    return 'sys_institutions_types';
  }

  /**
   * [optional]
   * The primary key column for the InstitutionType model.
   * 
   * @returns {string} The primary key column for the InstitutionType model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The JSON schema for validation.
   * 
   * @returns {Object} The JSON schema for the InstitutionType model.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: ['string', 'null'], format: 'date-time' }
      }
    };
  }

  /**
   * [optional]
   * Define the relation mappings.
   * 
   * @returns {Object} The relation mappings for the Institution model.
   */
  static get relationMappings() {
    const Institution = require('./Institutions');
    return {
      institutions: {
        relation: Model.HasManyRelation,
        modelClass: Institution,
        join: {
          from: 'sys_institutions_types.id',
          to: 'sys_institutions.sys_details_institutions_id'
        }
      }
    };
  }
}

module.exports = InstitutionType;
