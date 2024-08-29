const BaseModel = require('./BaseModel');
const UserPersonalInfo = require('./UserPersonalInfo');
const SysValuesList = require('./ValuesLists');

class ContractsEmployee extends BaseModel {
  static get tableName() {
    return 'contracts_employees';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_personal_info_id', 'status', 'nombre_contrato', 'tipo_contrato', 'afecto_trato', 'fecha_inicio', 'cambio_indefinido', 'agrupacion_seguridad', 'sueldo_base', 'area', 'cargo', 'sede', 'centro_costo', 'sindicato', 'direccion_laboral', 'supervisor_directo', 'categoria_ine', 'ocupacion'],
      properties: {
        id: { type: 'integer' },
        user_personal_info_id: { type: 'integer' },
        status: { type: 'integer' },
        nombre_contrato: { type: 'string' },
        tipo_contrato: { type: 'string' },
        afecto_trato: { type: 'string' },
        fecha_inicio: { type: 'string', format: 'date' },
        cambio_indefinido: { type: 'string', format: 'date' },
        agrupacion_seguridad: { type: 'integer' },
        sueldo_base: { type: 'number' },
        area: { type: 'integer' },
        cargo: { type: 'integer' },
        sede: { type: 'integer' },
        centro_costo: { type: 'integer' },
        sindicato: { type: 'integer' },
        direccion_laboral: { type: 'string' },
        supervisor_directo: { type: 'integer' },
        categoria_ine: { type: 'integer' },
        ocupacion: { type: 'integer' },
        modalidad_contrato: { type: ['string', 'null'] },
        horas_semanales: { type: ['string', 'null'] },
        distribucion_jornada: { type: ['string', 'null'] },
        jornada_parcial: { type: ['string', 'null'] },
        teletrabajo: { type: ['string', 'null'] },
        fecha_incorperacion_cotiza: { type: ['string', 'null'], format: 'date' },
        cotizacion: { type: ['number', 'null'] },
        nivel_sence: { type: ['integer', 'null'] },
        zona_extrema: { type: ['integer', 'null'] },
        cotiza_trabajo_pesado: { type: ['string', 'null'] },
        seguro_cesantia: { type: ['string', 'null'] },
        sueldo_patronal: { type: ['string', 'null'] },
        fecha_termino: { type: ['string', 'null'], format: 'date' },
        causal_termino: { type: ['integer', 'null'] },
        fecha_primera_renovacion: { type: ['string', 'null'], format: 'date' },
        fecha_segunda_renovacion: { type: ['string', 'null'], format: 'date' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: ['string', 'null'], format: 'date-time' },
      }
    };
  }

  static get relationMappings() {
    return {
      userPersonalInfo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserPersonalInfo,
        join: {
          from: 'contracts_employees.user_personal_info_id',
          to: 'user_personal_info.id'
        }
      },
      agrupacionSeguridad: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: SysValuesList,
        join: {
          from: 'contracts_employees.agrupacion_seguridad',
          to: 'sys_values_lists.id'
        }
      },
      area_employees: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: SysValuesList,
        join: {
          from: 'contracts_employees.area',
          to: 'sys_values_lists.id'
        }
      },
      cargo_employees: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: SysValuesList,
        join: {
          from: 'contracts_employees.cargo',
          to: 'sys_values_lists.id'
        }
      },
      sede_employees: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: SysValuesList,
        join: {
          from: 'contracts_employees.sede',
          to: 'sys_values_lists.id'
        }
      },
      centroCosto: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: SysValuesList,
        join: {
          from: 'contracts_employees.centro_costo',
          to: 'sys_values_lists.id'
        }
      },
      sindicato_employees: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: SysValuesList,
        join: {
          from: 'contracts_employees.sindicato',
          to: 'sys_values_lists.id'
        }
      },
      supervisorDirecto: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserPersonalInfo,
        join: {
          from: 'contracts_employees.supervisor_directo',
          to: 'user_personal_info.id'
        }
      },
      categoriaIne: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: SysValuesList,
        join: {
          from: 'contracts_employees.categoria_ine',
          to: 'sys_values_lists.id'
        }
      },
      ocupacion_employees: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: SysValuesList,
        join: {
          from: 'contracts_employees.ocupacion',
          to: 'sys_values_lists.id'
        }
      }
    };
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = ContractsEmployee;
