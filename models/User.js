const BaseModel = require('./BaseModel');
const bcrypt = require('bcrypt');
const { raw, transaction } = require('objection');
const UserPersonalInfo = require('./UserPersonalInfo');
const StatusUser = require('./StatusUser');
const Role = require('./Role');
const UserRoles = require('./UserRoles'); // Tabla intermedia

/**
 * Model User
 */
class User extends BaseModel {

  /**
   * [required]
   * The table name for the User model.
   * 
   * @returns {string} The table name for the User model.
   */
  static get tableName() {
    return 'users'; 
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        status_user_id: { type: 'integer' },
        user_personal_info_id: { type: 'integer' },
        email: { type: 'string' },
        password: { type: 'string' }
        // Otros campos de tu tabla
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
          from: 'users.user_personal_info_id',
          to: 'user_personal_info.id'
        }
      },
      status: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: StatusUser,
        join: {
          from: 'users.status_user_id',
          to: 'status_users.id'
        }
      },
      roles: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'users.id',
          through: {
            from: 'user_has_roles.users_id',
            to: 'user_has_roles.roles_id'
          },
          to: 'roles.id'
        }
      }
    };
  }
}

module.exports = User;
