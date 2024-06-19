const BaseModel = require('./BaseModel');

/**
 * Model MatriculaModality
 */
class MatriculaModality extends BaseModel {

  /**
   * [required]
   * The table name for the MatriculaModality model.
   * 
   * @returns {string} The table name for the MatriculaModality model.
   */
  static get tableName() {
    return 'sys_matricula_modality'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the MatriculaModality model.
   * 
   * @returns {string} The primary key column for the MatriculaModality model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = MatriculaModality;
