const BaseModel = require('./BaseModel');

/**
 * Model SchoolPeriod
 */
class SchoolPeriod extends BaseModel {

  /**
   * [required]
   * The table name for the SchoolPeriod model.
   * 
   * @returns {string} The table name for the SchoolPeriod model.
   */
  static get tableName() {
    return 'sys_school_period'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the SchoolPeriod model.
   * 
   * @returns {string} The primary key column for the SchoolPeriod model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = SchoolPeriod;
