const BaseModel = require('./BaseModel');
const Institutions = require('./Institutions');

/**
 * Model Companies
 */
class Companies extends BaseModel {

  /**
   * [required]
   * The table name for the Companies model.
   * 
   * @returns {string} The table name for the Companies model.
   */
  static get tableName() {
    return 'sys_companies'; 
  }
  
  /**
   * The JSON schema for validation.
   * 
   * @returns {object} The JSON schema for validation.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sys_mutual_id', 'sys_caja_compensacion_id', 'sys_community_id'],
      properties: {
        id: { type: 'integer' },
        sys_community_id: { type: 'integer' },
        sys_institutions_id_ccaf: { type: 'integer' },
        sys_institutions_id_mutual: { type: 'integer' },
        national_identifier: { type: 'string', maxLength: 45 },
        business_name: { type: 'string', maxLength: 45 },
        email_human_resources: { type: 'string', maxLength: 45 },
        legal_representative_name: { type: 'string', maxLength: 45 },
        national_id_legal_representative: { type: 'string', maxLength: 45 },
        email_legal_representative: { type: 'string', maxLength: 45 },
        phone_legal_representative: { type: 'string', maxLength: 45 },
        cotizacion_mutual: { type: 'string', maxLength: 45 },
        actividad_economica: { type: 'string', maxLength: 45 },
        codigo_actividad_economina: { type: 'string', maxLength: 45 },
        street_name: { type: 'string', maxLength: 45 },
        street_number: { type: 'string', maxLength: 45 },
        postal_code: { type: 'string', maxLength: 45 },
        department_number: { type: 'string', maxLength: 45 },
        town: { type: 'string', maxLength: 45 },
        block: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: 'string', maxLength: 45 }
      }
    };
  }

  /**
   * Relations to other models.
   */
  static get relationMappings() {
    const Community = require('./Community');
    
    return {
      community: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Community,
        join: {
          from: 'sys_companies.sys_community_id',
          to: 'sys_community.id'
        }
      },
      ccaf: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Institutions,
        join: {
          from: 'sys_companies.sys_institutions_id_ccaf',
          to: 'sys_institutions.id'
        }
      },
      mutual: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Institutions,
        join: {
          from: 'sys_companies.sys_institutions_id_mutual',
          to: 'sys_institutions.id'
        }
      }
    };
  }
}

module.exports = Companies;