const BaseModel = require('./BaseModel');
const Concepts = require('./Concepts');

class Attributes extends BaseModel {

  static get tableName() {
    return 'sys_attributes';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sys_concepts_id'],
      properties: {
        id: { type: 'integer' },
        se_rebaja_por_dias_no_trabajados: { type: 'integer' },
        suma_base_ias: { type: 'integer' },
        suma_base_provision_vacaciones: { type: 'integer' },
        suma_base_vacaciones_proporcionales: { type: 'integer' },
        se_debe_contabilizar: { type: 'integer' },
        se_puede_pagar_directo: { type: 'integer' },
        se_debe_agregar_institucion: { type: 'integer' },
        es_imprimibles: { type: 'integer' },
        es_preconcepto: { type: 'integer' },
        suma_base_exenta_ias: { type: 'integer' },
        suma_base_calculo_sil: { type: 'integer' },
        constituye_renta_no_gravada: { type: 'integer' },
        prorratea_compensacion_bruto: { type: 'integer' },
        permite_ajustar_nombre: { type: 'integer' },
        excluye_liquido_garantizado: { type: 'integer' },
        es_bono_fijo: { type: 'integer' },
        sys_concepts_id: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      concept: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Concepts,
        join: {
          from: 'sys_attributes.sys_concepts_id',
          to: 'sys_concepts.id'
        }
      }
    };
  }
}

module.exports = Attributes;
