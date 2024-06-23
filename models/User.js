// models/ExampleModel.js
const BaseModel = require('./BaseModel');
const { raw } = require('objection');
//const UserPersonalInfo = require('./UserPersonalInfo');

class User extends BaseModel {
  static get tableName() {
    return 'users'; // Reemplaza con el nombre de tu tabla
  }
  

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        // Otros campos de tu tabla
      }
    };
  }

  static async findByEmail(email) {
    return this.query()
      .select([
        'users.id',
        'user_personal_info.id as id_user_personal_info',
        'user_personal_info.name',
        'user_personal_info.lastname',
        'user_personal_info.mother_lastname',
        'user_personal_info.type_document',
        'user_personal_info.document_number',
        'status_users.description as status',
        'users.email',
        'users.my_color',
        'users.grayscale',
        'user_personal_info.gender',
        'user_personal_info.phone',
        'user_personal_info.image',
        'users.password',
        raw('JSON_ARRAYAGG(JSON_OBJECT(' +
            '"id", CONVERT(roles.id, char), ' +
            '"name", roles.name, ' +
            '"image", roles.image, ' +
            '"route", roles.route' +
          '))').as('roles')
      ])
      .join('user_personal_info', 'user_personal_info.id', 'users.user_personal_info_id')
      .join('status_users', 'status_users.id', 'users.status_user_id')
      .join('user_has_roles', 'user_has_roles.users_id', 'users.id')
      .join('roles', 'roles.id', 'user_has_roles.roles_id')
      .where('users.email', email)
      .andWhere('users.status_user_id', 1)
      .groupBy('users.id')
      .first(); // This ensures only one user is returne
  }

  
}

module.exports = User;
