const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');

/**
 * Model UserCivilianInfo
 */
class UserCivilianInfo extends BaseModel {

  /**
   * [required]
   * The table name for the UserCivilianInfo model.
   * 
   * @returns {string} The table name for the UserCivilianInfo model.
   */
  static get tableName() {
    return 'user_civilian_information'; // Cambiar el nombre de la tabla
  }

  static get idColumn() {
    return 'user_personal_info_id';
  }

  /**
   * The JSON schema for the model.
   * 
   * @returns {Object} The JSON schema.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_personal_info_id', 'birthdate', 'country_birth', 'nationality'],

      properties: {
        id: { type: 'integer' },
        user_personal_info_id: { type: 'integer' },
        birthdate: { type: 'string', maxLength: 10 },
        country_birth: { type: 'string', maxLength: 50 },
        nationality: { type: 'string', maxLength: 50 },
        civil_status: { type: 'string', maxLength: 50, nullable: true },
        study_level: { type: 'integer' },
        driver_license: { type: 'integer' },
        profession: { type: 'integer' },
        occupational_level: { type: 'integer' },
        observaciones: { type: 'string', maxLength: 255, nullable: true },
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
          from: 'user_civilian_information.user_personal_info_id',
          to: 'user_personal_info.id'
        }
      }
    };
  }

  /**
   * [optional]
   * The primary key column for the UserCivilianInfo model.
   * 
   * @returns {string} The primary key column for the UserCivilianInfo model.
   */
  static get idColumn() {
    return 'id';
  }
}

module.exports = UserCivilianInfo;
