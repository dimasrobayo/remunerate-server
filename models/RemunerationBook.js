const BaseModel = require('./BaseModel');

/**
 * Model for the sys_libro_remuneraciones_electrico table.
 */
class RemunerationBook extends BaseModel {

  /**
   * [required]
   * The table name for the model.
   * 
   * @returns {string} The table name for the model.
   */
  static get tableName() {
    return 'sys_libro_remuneraciones_electrico';
  }

  /**
   * [optional]
   * The primary key column for the model.
   * 
   * @returns {string} The primary key column for the model.
   */
  static get idColumn() {
    return 'id';
  }

  /**
   * [optional]
   * JSON schema for validation.
   * 
   * @returns {Object} The JSON schema for validation.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type'],
      properties: {
        id: { type: 'integer' },
        type: { type: 'integer' },
        code: { type: 'string', maxLength: 45 },
        description: { type: 'string', maxLength: 100 }
      }
    };
  }

  /**
   * [optional]
   * Relation mappings for the model.
   * 
   * @returns {Object} The relation mappings for the model.
   */
  static get relationMappings() {
    const TypeLRE = require('./TypeLRE'); // Suponiendo que tienes un modelo para `sys_types_lre`
    
    return {
      typeLRE: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TypeLRE,
        join: {
          from: 'sys_libro_remuneraciones_electrico.type',
          to: 'sys_types_lre.id'
        }
      }
    };
  }
}

module.exports = RemunerationBook;
