const BaseModel = require('./BaseModel');

/**
 * Model StatusUser
 */
class StatusUser extends BaseModel {

  /**
   * [required]
   * The table name for the StatusUser model.
   * 
   * @returns {string} The table name for the StatusUser model.
   */
  static get tableName() {
    return 'status_users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        description: { type: 'string' }
        // Otros campos de tu tabla
      }
    };
  }

  /**
  * Define the relation mappings for the model.
  */
  static get relationMappings() {
    const User = require('./User'); // Asegúrate de tener este archivo

    return {
      users: {
        relation: BaseModel.HasManyRelation,
        modelClass: User,
        join: {
          from: 'status_users.id',
          to: 'users.status_user_id'
        }
      }
    };
  }
}

module.exports = StatusUser;