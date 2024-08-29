const BaseModel = require('./BaseModel');

class PayrollTemplateType extends BaseModel {

  static get tableName() {
    return 'payroll_templates_types';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: 'string', format: 'date-time', nullable: true }
      }
    };
  }
}

module.exports = PayrollTemplateType;