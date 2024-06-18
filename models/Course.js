const BaseModel = require('./BaseModel');

/**
 * Model Course
 */
class Course extends BaseModel {

  /**
   * [required]
   * The table name for the Course model.
   * 
   * @returns {string} The table name for the Course model.
   */
  static get tableName() {
    return 'sys_courses'; // Cambiar el nombre de la tabla
  }

  /**
   * [optional]
   * The primary key column for the Course model.
   * 
   * @returns {string} The primary key column for the Course model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The virtualAttributes .
   * @returns {Array} The public methods name.
   */
  static get virtualAttributes() {
    return ['fullName'];
  }

  /**
   * [optional]
   * The concatenation id and name.
   * @returns {string} The primary key and name column for the Course model.
   */
  fullName() {
    return `${this.code_course} - ${this.name}`;
  }

  /**
   * [optional]
   * Retrieves courses along with their associated grades.
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

  /**
   * [optional]
   * Retrieves constraints AKA rules for validation wiht validate methods.
   * @returns {<Object>>} Return resolving to validate.
   */
  static get constraints() {
    return {
      name: {
        presence: {
          allowEmpty: false,
          message: '^El name es un campo requerido.'
        },
        type: 'string'
      },
      code_course: {
        presence: {
          allowEmpty: false,
          message: '^El code_course es un campo requerido.'
        },
        type: 'string'
      },
      sys_grade_id: {
        presence: {
          allowEmpty: false,
          message: '^El sys_grade_id es un campo requerido.'
        },
        type: 'integer'
      }
    };
  }

  /**
   * [optional]
   * Performs data validation using the constraints defined in the model.
   * @param {object} attributes - The data to validate.
   * @throws {ValidationError} - Thrown if the data does not meet the constraints.
   * @returns {object} - The validated data.
   */
  $validate(attributes) {
    // Run validation using validate.js and model constraints
    const validationErrors = this._validation(attributes, this.constructor.constraints);

    // If there are validation errors, throw a ValidationError error
    if (validationErrors) {
      throw new this.constructor.ValidationError(validationErrors);
    }

    // If there are no errors, return the validated data
    return attributes;
  }


  /**
   * [optional]
   * Class to handle model-specific validation errors.
   * Extends the base class `BaseModel.ValidationError`.
   * @extends {BaseModel.ValidationError}
   */
  static get ValidationError() {
    return class extends BaseModel.ValidationError {
      /**
       * Constructor de la clase.
       * @param {object} errors - Object containing details of validation errors.
       */
      constructor(errors) {
        super({ type: 'ModelValidation', data: errors, success: false });
      }
    };
  }
}

module.exports = Course;
