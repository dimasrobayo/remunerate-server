const BaseModel = require('./BaseModel');

/**
 * Model Teacher
 */
class Teacher extends BaseModel {

  /**
   * [required]
   * The table name for the Teacher model.
   * 
   * @returns {string} The table name for the Teacher model.
   */
  static get tableName() {
    return 'sys_teachers'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the Teacher model.
   * 
   * @returns {string} The primary key column for the Teacher model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = Teacher;
