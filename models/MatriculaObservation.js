const BaseModel = require('./BaseModel');

/**
 * Model MatriculaObservation
 */
class MatriculaObservation extends BaseModel {

  /**
   * [required]
   * The table name for the MatriculaObservation model.
   * 
   * @returns {string} The table name for the MatriculaObservation model.
   */
  static get tableName() {
    return 'sys_matricula_observation'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the MatriculaObservation model.
   * 
   * @returns {string} The primary key column for the MatriculaObservation model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = MatriculaObservation;
