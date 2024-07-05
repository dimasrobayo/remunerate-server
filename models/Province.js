const BaseModel = require('./BaseModel');

/**
 * Model Province
 */
class Province extends BaseModel {

  /**
   * [required]
   * The table name for the Province model.
   * 
   * @returns {string} The table name for the Province model.
   */
  static get tableName() {
    return 'sys_provinces';
  }

  /**
   * [optional]
   * The primary key column for the Province model.
   * 
   * @returns {string} The primary key column for the Province model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * The JSON schema for validating Province model properties.
   * 
   * @returns {object} The JSON schema for the Province model.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['provincia', 'region_id'],
      properties: {
        id: { type: 'integer' },
        provincia: { type: 'string', maxLength: 64 },
        region_id: { type: 'integer' }
      }
    };
  }

  /**
   * [optional]
   * The relation mappings for the Province model.
   * 
   * @returns {object} The relation mappings for the Province model.
   */
  static get relationMappings() {
    const Region = require('./Region');
    const Community = require('./Community');
    return {
      region: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Region,
        join: {
          from: 'sys_provinces.region_id',
          to: 'sys_regions.id'
        }
      },
      communities: {
        relation: BaseModel.HasManyRelation,
        modelClass: Community,
        join: {
          from: 'sys_provinces.id',
          to: 'sys_community.provincia_id'
        }
      }
    };
  }
}

module.exports = Province;