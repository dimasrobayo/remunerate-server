// models/ExampleModel.js
const BaseModel = require('./BaseModel');
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

  

  
}

module.exports = User;
