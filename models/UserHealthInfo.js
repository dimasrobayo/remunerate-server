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
   * The primary key column for the UserHealthInfo model.
   * 
   * @returns {string} The primary key column for the UserHealthInfo model.
   */
    static get idColumn() {
        return 'user_personal_info_id';
    }

    /**
   * The JSON schema for the model.
   * 
   * @returns {Object} The JSON schema.
   */
    static get jsonSchema() {
        return {
        type: 'object',
        required: ['user_personal_info_id', 'blood_type', 'allergy', 'emergency_name', 'emergency_relationship', 'emergency_phone1', 'emergency_phone2', 'observation'],

        properties: {
            id: { type: 'integer' },
            user_personal_info_id: { type: 'integer' },
            blood_type: { type: 'string', maxLength: 45 },
            allergy: { type: 'string', maxLength: 45 },
            emergency_name: { type: 'string', maxLength: 45 },
            emergency_relationship: { type: 'string', maxLength: 45 },
            emergency_phone1: { type: 'string', maxLength: 45 },
            emergency_phone2: { type: 'string', maxLength: 45 },
            observation: { type: 'string', maxLength: 255 },
            created_ad: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
        }
        };
    }
}

module.exports = UserHealthInfo;
