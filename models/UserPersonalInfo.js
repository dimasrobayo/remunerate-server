const BaseModel = require('./BaseModel');
const User = require('./User');
const UserCivilianInformation = require('./UserCivilianInfo');
const UserSocialInformation = require('./UserSocialInfo');
const UserHealthInformation = require('./UserHealthInfo');
const UserAddress = require('./UserAddress');
const UserHealthPension = require('./UserHealthPension');
const UserPaymentMethod = require('./UserPaymentMethod');
const PayrollTemplate = require('./PayrollTemplate');

class UserPersonalInfo extends BaseModel {
  static get tableName() {
    return 'user_personal_info';
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
        status: { type: 'integer' }
      }
    };
  }

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
      },
      healthPension: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserHealthPension,
        join: {
          from: 'user_personal_info.id',
          to: 'user_health_pension.user_personal_info_id'
        }
      },
      paymentMethod: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserPaymentMethod,
        join: {
          from: 'user_personal_info.id',
          to: 'user_payment_method.user_personal_info_id'
        }
      },
      payrollTemplates: {
        relation: BaseModel.HasManyRelation,
        modelClass: PayrollTemplate,
        join: {
          from: 'user_personal_info.id',
          to: 'payroll_templates.user_personal_info_id'
        }
      },
    };
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = UserPersonalInfo;
