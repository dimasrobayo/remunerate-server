const BaseModel = require('./BaseModel');

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
        sys_mutual_id: { type: 'integer' },
        sys_caja_compensacion_id: { type: 'integer' },
        sys_community_id: { type: 'integer' },
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
    const Mutual = require('./Mutual');
    const CajaCompensacion = require('./CajaCompensacion');
    const Community = require('./Community');
    
    return {
      mutual: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Mutual,
        join: {
          from: 'sys_companies.sys_mutual_id',
          to: 'sys_mutual.id'
        }
      },
      cajaCompensacion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CajaCompensacion,
        join: {
          from: 'sys_companies.sys_caja_compensacion_id',
          to: 'sys_caja_compensacion.id'
        }
      },
      community: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Community,
        join: {
          from: 'sys_companies.sys_community_id',
          to: 'sys_community.id'
        }
      }
    };
  }
}

module.exports = Companies;