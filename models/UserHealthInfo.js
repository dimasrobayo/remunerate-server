const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');

/**
 * Model UserHealthInfo
 */
class UserHealthInfo extends BaseModel {
    /**
    * [required]
    * The table name for the UserHealthInfo model.
    * 
    * @returns {string} The table name for the UserHealthInfo model.
    */
    static get tableName() {
        return 'user_health_information'; // Cambiar el nombre de la tabla
    }

    /**
   * [optional]
   * The primary key column for the UserCivilianInfo model.
   * 
   * @returns {string} The primary key column for the UserCivilianInfo model.
   */
    static get idColumn() {
        return 'user_personal_info_id';
    }
}

module.exports = UserHealthInfo;
