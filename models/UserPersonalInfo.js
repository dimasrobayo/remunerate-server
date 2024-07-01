const BaseModel = require('./BaseModel');
const User = require('./User');
const UserCivilianInformation = require('./UserCivilianInfo');
const UserSocialInformation = require('./UserSocialInfo');
const UserHealthInformation = require('./UserHealthInfo');
const { join } = require('path');
const UserAddress = require('./UserAddress');

/**
 * Model UserPersonalInfo
 */
class UserPersonalInfo extends BaseModel {

  /**
   * [required]
   * The table name for the UserPersonalInfo model.
   * 
   * @returns {string} The table name for the UserPersonalInfo model.
   */
  static get tableName() {
    return 'user_personal_info'; // Cambiar el nombre de la tabla
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        lastname: { type: 'string' },
        mother_lastname: { type: 'string' },
        type_document: { type: 'string' },
        document_number: { type: 'string' },
        gender: { type: 'string' },
        phone: { type: 'string' },
        image: { type: 'string' },
        // Otros campos de tu tabla
      }
    };
  }

  /**
  * Define the relation mappings for the model.
  */
  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: User,
        join: {
          from: 'user_personal_info.id',
          to: 'users.user_personal_info_id'
        }
      },
      civilianInformation: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserCivilianInformation,
        join: {
          from: 'user_personal_info.id',
          to: 'user_civilian_information.user_personal_info_id'
        }
      },
      socialInformation: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserSocialInformation,
        join: {
          from: 'user_personal_info.id',
          to: 'user_social_information.user_personal_info_id'
        }
      },
      healthInformation: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserHealthInformation,
        join: {
          from: 'user_personal_info.id',
          to: 'user_health_information.user_personal_info_id'
        }
      },
      addressInformation: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: UserAddress,
        join: {
          from: 'user_personal_info.id',
          through: {
            from: 'user_addresses_personal_info.user_personal_info_id',
            to: 'user_addresses_personal_info.address_id'
          },
          to: 'user_addresses.id'
        }
      }
    };
  }

  /**
   * [optional]
   * The primary key column for the UserPersonalInfo model.
   * 
   * @returns {string} The primary key column for the UserPersonalInfo model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = UserPersonalInfo;
