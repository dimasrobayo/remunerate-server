const BaseModel = require('./BaseModel');
const Province = require('./Province');

class Community extends BaseModel {
  static get tableName() {
    return 'sys_community';
  }

  static get idColumn() {
    return 'id';
  }

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

  static get relationMappings() {
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
