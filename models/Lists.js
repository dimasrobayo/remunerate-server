const BaseModel = require('./BaseModel');
const ValuesLists = require('./ValuesLists');

/**
 * Model for the sys_lists table.
 */
class Lists extends BaseModel {

  /**
   * [required]
   * The table name for the List model.
   * 
   * @returns {string} The table name for the List model.
   */
  static get tableName() {
    return 'sys_lists';
  }

  /**
   * [optional]
   * The primary key column for the List model.
   * 
   * @returns {string} The primary key column for the List model.
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
      required: [],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
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
      values: {
        relation: BaseModel.HasManyRelation,
        modelClass: ValuesLists,
        join: {
          from: 'sys_lists.id',
          to: 'sys_values_lists.sys_lists_id'
        }
      }
    };
  }
}

module.exports = Lists;