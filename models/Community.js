const BaseModel = require('./BaseModel');

/**
 * Model Community
 */
class Community extends BaseModel {

  /**
   * [required]
   * The table name for the Community model.
   * 
   * @returns {string} The table name for the Community model.
   */
  static get tableName() {
    return 'sys_community';
  }

  /**
   * [optional]
   * The primary key column for the Community model.
   * 
   * @returns {string} The primary key column for the Community model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The JSON schema for validating Community model properties.
   * 
   * @returns {object} The JSON schema for the Community model.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['comuna', 'provincia_id'],
      properties: {
        id: { type: 'integer' },
        comuna: { type: 'string', maxLength: 64 },
        provincia_id: { type: 'integer' }
      }
    };
  }

  /**
   * [optional]
   * The relation mappings for the Community model.
   * 
   * @returns {object} The relation mappings for the Community model.
   */
  static get relationMappings() {
    const Province = require('./Province');
    return {
      province: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Province,
        join: {
          from: 'sys_community.provincia_id',
          to: 'sys_provinces.id'
        }
      }
    };
  }
}

module.exports = Community;
