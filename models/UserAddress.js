const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');
const Community = require('./Community');

class UserAddress extends BaseModel {
  static get tableName() {
    return 'user_addresses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        address: { type: 'string' },
        block: { type: 'string' },
        codigo_postal: { type: 'string' },
        department_number: { type: 'string' },
        housing_type: { type: 'string' },
        sys_community_id: { type: 'integer' }
      }
    };
  }

  async $beforeInsert() {
    if (this.sys_region_id) {
      delete this.sys_region_id;
    }
  }

  async $beforeUpdate() {
    if (this.sys_region_id) {
      delete this.sys_region_id;
    }
  }

  static get relationMappings() {
    return {
      personalInfo: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: UserPersonalInfo,
        join: {
          from: 'user_addresses.id',
          through: {
            from: 'user_addresses_personal_info.address_id',
            to: 'user_addresses_personal_info.user_personal_info_id'
          },
          to: 'user_personal_info.id'
        }
      },
      community: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Community,
        join: {
          from: 'user_addresses.sys_community_id',
          to: 'sys_community.id'
        }
      }
    };
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = UserAddress;
