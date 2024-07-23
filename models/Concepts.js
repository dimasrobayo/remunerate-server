const BaseModel = require('./BaseModel');
const Attributes = require('./Attributes');
const TypesConcept = require('./TypesConcepts');
const InternalCategory = require('./InternalCategories');
const RemunerationBook = require('./RemunerationBook');

class Concept extends BaseModel {

  static get tableName() {
    return 'sys_concepts';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sys_types_concepts_id', 'sys_internal_categories_id', 'sys_libro_remuneraciones_electrico_id'],
      properties: {
        id: { type: 'integer' },
        sys_types_concepts_id: { type: 'integer' },
        sys_internal_categories_id: { type: 'integer' },
        sys_libro_remuneraciones_electrico_id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        status: { type: 'integer' },
        comportamiento: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: 'string', format: 'date-time', nullable: true }
      }
    };
  }

  static get relationMappings() {
    return {
      attributes: {
        relation: BaseModel.HasOneRelation,
        modelClass: Attributes,
        join: {
          from: 'sys_concepts.id',
          to: 'sys_attributes.sys_concepts_id'
        }
      },
      typesConcept: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TypesConcept,
        join: {
          from: 'sys_concepts.sys_types_concepts_id',
          to: 'sys_types_concepts.id'
        }
      },
      internalCategory: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: InternalCategory,
        join: {
          from: 'sys_concepts.sys_internal_categories_id',
          to: 'sys_internal_categories.id'
        }
      },
      remunerationBook: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: RemunerationBook,
        join: {
          from: 'sys_concepts.sys_libro_remuneraciones_electrico_id',
          to: 'sys_libro_remuneraciones_electrico.id'
        }
      }
    };
  }
}

module.exports = Concept;
