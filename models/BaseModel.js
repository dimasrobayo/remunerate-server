const { Model } = require('objection');

class BaseModel extends Model {
  
  /**
   * Finds all records.
   * 
   * @returns {Promise<Array<Model>>} Array of all records found.
   */
  static async findAll() {
    return this.query();
  }

  /**
   * Finds a record by ID.
   * 
   * @param {number} id The ID of the record to find.
   * @returns {Promise<Model|null>} The found record or null if not found.
   */
  static async findById(id) {
    return this.query().findById(id);
  }

  /**
   * Creates a new record.
   * 
   * @param {Object} data The data object to insert.
   * @returns {Promise<Model>} The newly created record.
   */
  static async create(data) {
    return this.query().insert(data);
  }

  /**
   * Updates a record by ID.
   * 
   * @param {number} id The ID of the record to update.
   * @param {Object} data The data object with fields to update.
   * @returns {Promise<Model|null>} The updated record or null if not found.
   */
  static async updateById(id, data) {
    return this.query().patchAndFetchById(id, data);
  }

  /**
   * Deletes a record by ID.
   * 
   * @param {number} id The ID of the record to delete.
   * @returns {Promise<number>} The number of records deleted (usually 1).
   */
  static async deleteById(id) {
    return this.query().deleteById(id);
  }

  /**
   * Finds records matching a specific condition.
   * 
   * @param {Object} condition The condition object for the query.
   * @returns {Promise<Array<Model>>} Array of records found.
   */
  static async findByCondition(condition) {
    return this.query().where(condition);
  }

  /**
   * Counts records matching a specific condition.
   * 
   * @param {Object} condition The condition object for the query.
   * @returns {Promise<number>} The count of records matching the condition.
   */
  static async countByCondition(condition) {
    return this.query().where(condition).resultSize();
  }

  /**
   * Finds a single record matching a specific condition.
   * 
   * @param {Object} condition The condition object for the query.
   * @returns {Promise<Model|null>} The found record or null if not found.
   */
  static async findOneByCondition(condition) {
    return this.query().findOne(condition);
  }
}

module.exports = BaseModel;
