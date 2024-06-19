const BaseModel = require('./BaseModel');

/**
 * Model UserAddress
 */
class UserAddress extends BaseModel {

  /**
   * [required]
   * The table name for the UserAddress model.
   * 
   * @returns {string} The table name for the UserAddress model.
   */
  static get tableName() {
    return 'user_addresses'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the UserAddress model.
   * 
   * @returns {string} The primary key column for the UserAddress model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = UserAddress;
