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
