const BaseModel = require('./BaseModel');

/**
 * Model Region
 */
class Region extends BaseModel {

  /**
   * [required]
   * The table name for the Region model.
   * 
   * @returns {string} The table name for the Region model.
   */
  static get tableName() {
    return 'sys_regions';
  }

  /**
   * [optional]
   * The primary key column for the Region model.
   * 
   * @returns {string} The primary key column for the Region model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The JSON schema for validating Region model properties.
   * 
   * @returns {object} The JSON schema for the Region model.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['region', 'abreviatura', 'capital'],
      properties: {
        id: { type: 'integer' },
        region: { type: 'string', maxLength: 64 },
        abreviatura: { type: 'string', maxLength: 4 },
        capital: { type: 'string', maxLength: 64 }
      }
    };
  }

  /**
   * [optional]
   * The relation mappings for the Region model.
   * 
   * @returns {object} The relation mappings for the Region model.
   */
  static get relationMappings() {
    const Province = require('./Province');
    return {
      provinces: {
        relation: BaseModel.HasManyRelation,
        modelClass: Province,
        join: {
          from: 'sys_regions.id',
          to: 'sys_provinces.region_id'
        }
      }
    };
  }
}

module.exports = Region;
