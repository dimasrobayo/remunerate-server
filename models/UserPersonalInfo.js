const BaseModel = require('./BaseModel');

/**
 * Model UserPersonalInfo
 */
class UserPersonalInfo extends BaseModel {

  /**
   * [required]
   * The table name for the UserPersonalInfo model.
   * 
   * @returns {string} The table name for the UserPersonalInfo model.
   */
  static get tableName() {
    return 'user_personal_info'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the UserPersonalInfo model.
   * 
   * @returns {string} The primary key column for the UserPersonalInfo model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = UserPersonalInfo;
