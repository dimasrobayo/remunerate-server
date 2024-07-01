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
   * Define the relation mappings for the model.
   */
  static get relationMappings() {
    const UserCivilianInformation = require('./UserCivilianInformation');

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
