const BaseModel = require('./BaseModel');

class GeneralValues extends BaseModel {
  static get tableName() {
    return 'sys_general_values';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['value_uf', 'value_utm', 'renta_minima', 'tope_imponible_afp', 'tope_imponible_seguro_cesantia', 'seguro_invalidez_sobrevivencia', 'tope_imponible_sistema_antiguo', 'escala_1a'],
      properties: {
        id: { type: 'integer' },
        value_uf: { type: 'number' },
        value_utm: { type: 'number' },
        renta_minima: { type: 'number' },
        tope_imponible_afp: { type: 'number' },
        tope_imponible_seguro_cesantia: { type: 'number' },
        seguro_invalidez_sobrevivencia: { type: 'number' },
        tope_imponible_sistema_antiguo: { type: 'number' },
        escala_1a: { type: 'number' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: 'string', format: 'date-time', nullable: true }
      }
    };
  }
}

module.exports = GeneralValues;