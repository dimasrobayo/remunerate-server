const BaseModel = require('./BaseModel');
const Institutions = require('./Institutions');
const Community = require('./Community');
const Province = require('./Province');
const Region = require('./Region');

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
      required: [
        'sys_community_id',
        'sys_institutions_id_ccaf',
        'sys_institutions_id_mutual',
        'national_identifier',
        'business_name',
        'email_human_resources',
        'legal_representative_name',
        'national_id_legal_representative',
        'email_legal_representative',
        'phone_legal_representative',
        'cotizacion_mutual',
        'actividad_economica',
        'codigo_actividad_economina',
        'street_name',
        'street_number',
        'postal_code'
      ],
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
        cutting_day: { type: 'string', maxLength: 45 },
        grouping_use: { type: 'string', maxLength: 45 },
        is_contracts_temporary_services: { type: 'boolean' },
        date_use_previred: { type: 'string', maxLength: 45 },
        use_cutoff_date_for_application_date: { type: 'boolean' },
        use_cutoff_date_for_disciplinary_events: { type: 'boolean' },
        vacation_days_remaining: { type: 'string', maxLength: 45 },
        consider_proportional_vacation_days: { type: 'boolean' },
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
    return {
      community: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Community,
        join: {
          from: 'sys_companies.sys_community_id',
          to: 'sys_community.id'
        }
      },
      province: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Province,
        join: {
          from: 'sys_community.provincia_id',
          to: 'sys_provinces.id'
        }
      },
      region: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Region,
        join: {
          from: 'sys_provinces.region_id',
          to: 'sys_regions.id'
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
