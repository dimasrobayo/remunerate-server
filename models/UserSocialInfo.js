const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');

/**
 * Model UserSocialInfo
 */
class UserSocialInfo extends BaseModel {

  /**
   * [required]
   * The table name for the UserSocialInfo model.
   * 
   * @returns {string} The table name for the UserSocialInfo model.
   */
  static get tableName() {
    return 'user_social_information'; // Cambiar el nombre de la tabla
  }

  /**
   * The JSON schema for the model.
   * 
   * @returns {Object} The JSON schema.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_personal_info_id', 'email', 'email_corporative', 'phone'],

      properties: {
        id: { type: 'integer' },
        user_personal_info_id: { type: 'integer' },
        email: { type: 'string', maxLength: 100 },
        email_corporative: { type: 'string', maxLength: 100 },
        phone: { type: 'string', maxLength: 45 },
        phone2: { type: 'string', maxLength: 45, nullable: true },
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
          from: 'user_social_information.user_personal_info_id',
          to: 'user_personal_info.id'
        }
      }
    };
  }

  /**
   * [optional]
   * The primary key column for the UserSocialInfo model.
   * 
   * @returns {string} The primary key column for the UserSocialInfo model.
   */
  static get idColumn() {
    return 'id';
  }
}

module.exports = UserSocialInfo;
