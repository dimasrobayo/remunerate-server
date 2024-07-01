const BaseModel = require('./BaseModel');
const User = require('./User');

/**
 * Model Role
 */
class Role extends BaseModel {

  /**
   * [required]
   * The table name for the Role model.
   * 
   * @returns {string} The table name for the Role model.
   */
  static get tableName() {
    return 'roles'; // Cambiar el nombre de la tabla
  }

  /**
  * Define the relation mappings for the model.
  */
  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'roles.id',
          through: {
            from: 'user_has_roles.roles_id',
            to: 'user_has_roles.users_id'
          },
          to: 'users.id'
        }
      }
    };
  }

  /**
   * [optional]
   * The primary key column for the Rol model.
   * 
   * @returns {string} The primary key column for the Rol model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = Role;
