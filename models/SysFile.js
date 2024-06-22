const BaseModel = require('./BaseModel');

/**
 * Model SysFile
 */
class SysFile extends BaseModel {

  /**
   * [required]
   * The table name for the SysFile model.
   * 
   * @returns {string} The table name for the SysFile model.
   */
  static get tableName() {
    return 'sys_files'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the SysFile model.
   * 
   * @returns {string} The primary key column for the SysFile model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = SysFile;
