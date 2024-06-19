const BaseModel = require('./BaseModel');

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
