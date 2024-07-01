const BaseModel = require('./BaseModel');

/**
 * Model Community
 */
class Community extends BaseModel {

  /**
   * [required]
   * The table name for the Community model.
   * 
   * @returns {string} The table name for the Community model.
   */
  static get tableName() {
    return 'sys_community'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the Community model.
   * 
   * @returns {string} The primary key column for the Community model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = Community;
