const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');

/**
 * Model UserPaymentMethod
 */
class UserPaymentMethod extends BaseModel {

  /**
   * [required]
   * The table name for the UserPaymentMethod model.
   * 
   * @returns {string} The table name for the UserPaymentMethod model.
   */
  static get tableName() {
    return 'user_payment_method'; // Cambiar el nombre de la tabla
  }

  /**
   * The JSON schema for the model.
   * 
   * @returns {Object} The JSON schema.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'user_personal_info_id',
        'payment_method',
        'bank',
        'current_account_number',
        'payment_percentage',
        'type_payment_method',
        'bic'
      ],

      properties: {
        id: { type: 'integer' },
        user_personal_info_id: { type: 'integer' },
        payment_method: { type: 'integer' },
        bank: { type: 'integer' },
        current_account_number: { type: 'string', maxLength: 45 },
        payment_percentage: { type: 'string', maxLength: 45 },
        type_payment_method: { type: 'string', maxLength: 45 },
        bic: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  /**
   * Define the relation mappings for the model.
   */
  static get relationMappings() {
    return {
      personalInfo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserPersonalInfo,
        join: {
          from: 'user_payment_method.user_personal_info_id',
          to: 'user_personal_info.id'
        }
      }
    };
  }

  /**
   * [optional]
   * The primary key column for the UserPaymentMethod model.
   * 
   * @returns {string} The primary key column for the UserPaymentMethod model.
   */
  static get idColumn() {
    return 'id';
  }
}

module.exports = UserPaymentMethod;
