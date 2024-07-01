const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');

/**
* Model UserAddress
*/
class UserAddress extends BaseModel {

  /**
  * [required]
  * The table name for the UserAddress model.
  * 
  * @returns {string} The table name for the UserAddress model.
  */
  static get tableName() {
    return 'user_addresses'; // Cambiar el nombre de la tabla
  }

/**
  * Define the relation mappings for the model.
  */
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
      }
  };
}

  /**
   * [optional]
   * The primary key column for the UserAddress model.
   * 
   * @returns {string} The primary key column for the UserAddress model.
   */
  static get idColumn() {
    return 'id';
  }

 
}

module.exports = UserAddress;
