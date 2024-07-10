const BaseModel = require('./BaseModel');

/**
 * Model for sys_institutions
 */
class Institution extends BaseModel {

  /**
   * [required]
   * The table name for the Institution model.
   * 
   * @returns {string} The table name for the Institution model.
   */
  static get tableName() {
    return 'sys_institutions';
  }

  /**
   * [optional]
   * The primary key column for the Institution model.
   * 
   * @returns {string} The primary key column for the Institution model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The JSON schema for validation.
   * 
   * @returns {Object} The JSON schema for the Institution model.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sys_details_institutions_id'],
      properties: {
        id: { type: 'integer' },
        sys_details_institutions_id: { type: 'integer' },
        rut_institution: { type: 'string', maxLength: 45 },
        name: { type: 'string', maxLength: 45 },
        value: { type: 'string', maxLength: 45 },
        aditional_data: { type: 'string', maxLength: 45 },
        equivalencia_previred: { type: 'string', maxLength: 45 },
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
    const InstitutionType = require('./InstitutionsTypes');
    return {
      institutionType: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: InstitutionType,
        join: {
          from: 'sys_institutions.sys_details_institutions_id',
          to: 'sys_institutions_types.id'
        }
      }
    };
  }
}

module.exports = Institution;
