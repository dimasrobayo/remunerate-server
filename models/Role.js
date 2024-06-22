const BaseModel = require('./BaseModel');

/**
 * Model Role
 */
class Role extends BaseModel {

  /**
   * [required]
   * The table name for the Role model.
   * 
   * @returns {string} The table name for the Role model.
   */
  static get tableName() {
    return 'roles'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the Rol model.
   * 
   * @returns {string} The primary key column for the Rol model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = Role;
