const BaseModel = require('./BaseModel');

/**
 * Model Matricula
 */
class Matricula extends BaseModel {

  /**
   * [required]
   * The table name for the Matricula model.
   * 
   * @returns {string} The table name for the Matricula model.
   */
  static get tableName() {
    return 'sys_matriculas'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * Retrieves courses along with their associated grades.
   * @returns {Promise<Array<Object>>} Promise resolving to an array of courses with associated grades.
   */
  static async get(properties) {
    const userTable = 'user_personal_info';
    const coursesTable = 'sys_courses';
    const periodTable = 'sys_school_period';
    const modalityTable = 'sys_matricula_modality';
    const currentYear = new Date().getFullYear().toString();

    if (properties.id) {
      properties[`${tableName}.id`] = properties.id;
      delete properties.id; // avoid field id is ambiguous
    }

    const query = this.query()
      .select(`${this.tableName}.id`,
        `${this.tableName}.date_matricula`,
        `${this.tableName}.create_at`,
        `${userTable}.name`,
        `${userTable}.mother_lastname`,
        `${userTable}.lastname`,
        `${coursesTable}.name as curso`,
        `${periodTable}.año_escolar`,
        `${modalityTable}.name as modality`)
      .from(this.tableName)
      .join(userTable, `${this.tableName}.user_personal_info_id`, `user_personal_info.id`)
      .join(coursesTable, `${this.tableName}.sys_courses_id`, `sys_courses.id`)
      .join(periodTable, `${this.tableName}.sys_school_period_id`, `sys_school_period.id`)
      .join(modalityTable, `${this.tableName}.sys_matricula_modality_id`, `sys_matricula_modality.id`)
      .whereNull(`${this.tableName}.deleted_at`)
      .where('sys_school_period.año_escolar', currentYear);;

    if (properties && Object.keys(properties).length > 0) {
      query.andWhere(params);
    }

    // Imprimir la consulta SQL generada
    const sql = query.toKnexQuery().toString();
    //console.log(sql);

    return query;
  }

}

module.exports = Matricula;
