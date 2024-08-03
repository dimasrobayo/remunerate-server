const BaseModel = require('./BaseModel');
const Lists = require('./Lists');

/**
 * Model for the sys_values_lists table.
 */
class ValueList extends BaseModel {

  /**
   * [required]
   * The table name for the ValueList model.
   * 
   * @returns {string} The table name for the ValueList model.
   */
  static get tableName() {
    return 'sys_values_lists';
  }

  /**
   * [optional]
   * The primary key column for the ValueList model.
   * 
   * @returns {string} The primary key column for the ValueList model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * JSON schema for validation.
   * 
   * @returns {Object} The JSON schema for validation.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sys_lists_id'],
      properties: {
        id: { type: 'integer' },
        sys_lists_id: { type: 'integer' },
        item: { type: 'string', maxLength: 45 },
        name: { type: 'string', maxLength: 100 },
        value_a: { type: 'number' },
        value_b: { type: 'number' },
        value_c: { type: 'number' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  /**
   * [optional]
   * Define the relation mappings to other models.
   * 
   * @returns {Object} The relation mappings.
   */
  static get relationMappings() {
    return {
      list: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Lists,
        join: {
          from: 'sys_values_lists.sys_lists_id',
          to: 'sys_lists.id'
        }
      }
    };
  }
}

module.exports = ValueList;
