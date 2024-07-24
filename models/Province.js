const BaseModel = require('./BaseModel');
const Region = require('./Region');
const Community = require('./Community');

class Province extends BaseModel {
  static get tableName() {
    return 'sys_provinces';
  }

  static get idColumn() {
    return 'id';
  }

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

  static get relationMappings() {
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
