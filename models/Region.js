const BaseModel = require('./BaseModel');

class Region extends BaseModel {
  static get tableName() {
    return 'sys_regions';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['region'],
      properties: {
        id: { type: 'integer' },
        region: { type: 'string', maxLength: 64 }
      }
    };
  }
}

module.exports = Region;
