const BaseModel = require('./BaseModel');

/**
 * Model UserRoles
 */
class UserRoles extends BaseModel {

  /**
   * [required]
   * The table name for the Role model.
   * 
   * @returns {string} The table name for the Role model.
   */
  static get tableName() {
    return 'user_has_roles'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the Rol model.
   * 
   * @returns {string} The primary key column for the Rol model.
   */
  static get idColumn() {
    return 'users_id';
  }

 
}

module.exports = UserRoles;
