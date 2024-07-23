const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');

/**
 * Model UserHealthPension
 */
class UserHealthPension extends BaseModel {

  /**
   * [required]
   * The table name for the UserHealthPension model.
   * 
   * @returns {string} The table name for the UserHealthPension model.
   */
  static get tableName() {
    return 'user_health_pension'; // Cambiar el nombre de la tabla
  }

  /**
   * The JSON schema for the model.
   * 
   * @returns {Object} The JSON schema.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'user_personal_info_id',
        'sys_countries_id',
        'family_allowance_section',
        'retired',
        'fun',
        'quote_pension_health',
        'pension_system',
        'afp_box',
        'afp_date',
        'isapre_health',
        'money',
        'uf',
        'pesos'
      ],

      properties: {
        id: { type: 'integer' },
        user_personal_info_id: { type: 'integer' },
        sys_countries_id: { type: 'integer' },
        family_allowance_section: { type: 'string', maxLength: 45 },
        retired: { type: 'string', maxLength: 45 },
        fun: { type: 'string', maxLength: 45 },
        quote_pension_health: { type: 'string', maxLength: 45 },
        pension_system: { type: 'string', maxLength: 45 },
        afp_box: { type: 'integer' },
        afp_date: { type: 'string' },
        isapre_health: { type: 'integer' },
        money: { type: 'string', maxLength: 45 },
        uf: { type: 'integer' },
        pesos: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  /**
   * Define the relation mappings for the model.
   */
  static get relationMappings() {
    return {
      personalInfo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserPersonalInfo,
        join: {
          from: 'user_health_pension.user_personal_info_id',
          to: 'user_personal_info.id'
        }
      }
    };
  }

  /**
   * [optional]
   * The primary key column for the UserHealthPension model.
   * 
   * @returns {string} The primary key column for the UserHealthPension model.
   */
  static get idColumn() {
    return 'id';
  }
}

module.exports = UserHealthPension;
