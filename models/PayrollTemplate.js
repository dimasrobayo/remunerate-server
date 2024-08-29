const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');
const SysConcept = require('./Concepts');
const PayrollTemplateType = require('./PayrollTemplateType');

class PayrollTemplate extends BaseModel {
    static get tableName() {
        return 'payroll_templates';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_personal_info_id', 'sys_concept_id', 'payroll_templates_type'],
            properties: {
                id: { type: 'integer' },
                user_personal_info_id: { type: 'integer' },
                sys_concept_id: { type: 'integer' },
                payroll_templates_type: { type: 'integer' },
                amount: { type: 'number', nullable: true },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
                deleted_at: { type: 'string', format: 'date-time', nullable: true }
            }
        };
    }

    static get relationMappings() {
        return {
        userPersonalInfo: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: UserPersonalInfo,
            join: {
                from: 'payroll_templates.user_personal_info_id',
                to: 'user_personal_info.id'
            }
        },
        sysConcept: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: SysConcept,
            join: {
                from: 'payroll_templates.sys_concept_id',
                to: 'sys_concepts.id'
            }
        },
        payrollTemplateType: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: PayrollTemplateType,
            join: {
                from: 'payroll_templates.payroll_templates_type',
                to: 'payroll_templates_types.id'
            }
        }
        };
    }
}

module.exports = PayrollTemplate;
