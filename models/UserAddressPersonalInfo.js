const BaseModel = require('./BaseModel');

/**
 * Model UserAddressPersonalInfo
 */
class UserAddressPersonalInfo extends BaseModel {

  /**
   * [required]
   * The table name for the UserAddressPersonalInfo model.
   * 
   * @returns {string} The table name for the UserAddressPersonalInfo model.
   */
  static get tableName() {
    return 'user_addresses_personal_info'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the UserAddressPersonalInfo model.
   * 
   * @returns {string} The primary key column for the UserAddressPersonalInfo model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = UserAddressPersonalInfo;
