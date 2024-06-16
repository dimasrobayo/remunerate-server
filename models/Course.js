const BaseModel = require('./BaseModel');

/**
 * Model Course
 */
class Course extends BaseModel {

  /**
   * The virtualAttributes .
   * 
   * @returns {Array} The public methods.
   */
  static get virtualAttributes() {
    return ['fullName'];
  }
  
  /**
   * The table name for the Course model.
   * 
   * @returns {string} The table name for the Course model.
   */
  static get tableName() {
    return 'sys_courses'; // Cambiar el nombre de la tabla
  }

  /**
   * The primary key column for the Course model.
   * 
   * @returns {string} The primary key column for the Course model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * The concatenation id and name.
   * 
   * @returns {string} The primary key and name column for the Course model.
   */
  fullName() {
    return this.id + ' ' + this.name;
  }

  /**
   * Retrieves courses along with their associated grades.
   * 
   * @returns {Promise<Array<Object>>} Promise resolving to an array of courses with associated grades.
   */
  static async getCourses() {
    const alias = 'sc';
    const relatedTableName = 'sys_grades'; // Nombre de la tabla relacionada

    return this.query()
      .alias(alias)
      .select(
        'sg.id as id_grade',
        'sg.code_grade',
        'sg.name as name_grade',
        `${alias}.*`
      )
      .innerJoin(`${relatedTableName} as sg`, 'sg.id', `${alias}.sys_grade_id`)
      .whereNull(`${alias}.deleted_at`)
      .whereNull('sg.deleted_at')
      .orderBy(`${alias}.id`);
  }
}

module.exports = Course;
