const BaseModel = require('./BaseModel');

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
