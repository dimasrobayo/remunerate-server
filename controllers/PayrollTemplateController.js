const { transaction } = require('objection');
const PayrollTemplate = require('../models/PayrollTemplate');
const UserPersonalInfo = require('../models/UserPersonalInfo');
const PayrollTemplateType = require('../models/PayrollTemplateType');
const Concept = require('../models/Concepts');
const { json } = require('express');

class PayrollTemplateController {

  // Obtener todos los registros
  async index(req, res) {
    try {
      const payrollTemplates = await PayrollTemplate.query()
        .withGraphFetched('[sysConcept, payrollTemplateType]')
        .whereNull('deleted_at');
  
      return res.status(200).json({
        success: true,
        message: 'List of all payroll templates.',
        data: payrollTemplates
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving payroll templates.',
        error: error.message
      });
    }
  }

  // Obtener un registro por ID
  async show(req, res) {
    try {
      const { id } = req.params;

      const payrollTemplate = await UserPersonalInfo.query()
      .findById(id)
      .withGraphFetched('payrollTemplates.[payrollTemplateType, sysConcept.remunerationBook.typeLRE]');

      if (!payrollTemplate) {
        return res.status(404).json({
          success: false,
          message: 'Payroll template not found.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Payroll template retrieved successfully.',
        data: payrollTemplate
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving payroll template.',
        error: error.message
      });
    }
  }

  // Obtener un registro de concepto por id de concepto y por id del usuario
  async conceptsByUser(req, res) {
    try {
      const { userId, conceptId } = req.params;
      
      const payrollTemplate = await PayrollTemplate.query()
      .where('user_personal_info_id', (userId))
      .andWhere('sys_concept_id', conceptId);
      
      if (!payrollTemplate) {
        return res.status(404).json({
          success: false,
          message: 'Payroll template not found.'
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Payroll template retrieved successfully.',
        data: payrollTemplate
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving payroll template.',
        error: error.message
      });
    }
  }

  // Crear un nuevo registro
  async create(req, res) {
    try {
      const payrollTemplateData = req.body;
      const newPayrollTemplate = await PayrollTemplate.query().insert(payrollTemplateData);
  
      return res.status(201).json({
        success: true,
        message: 'Payroll template created successfully.',
        data: newPayrollTemplate
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error creating payroll template.',
        error: error.message
      });
    }
  }

  // Actualizar un registro existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { user_personal_info_id, sys_concept_id, payroll_templates_type, amount } = req.body;

      const updatedPayrollTemplate = await PayrollTemplate.query()
      .patchAndFetchById(id, { user_personal_info_id, sys_concept_id, payroll_templates_type, amount });

      if (!updatedPayrollTemplate) {
        return res.status(404).json({
          success: false,
          message: 'Payroll template not found.'
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Payroll template updated successfully.',
        data: updatedPayrollTemplate
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Error updating payroll template.',
        error: error.message
      });
    }
  }

  // Eliminar un registro (borrado lógico)
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
      const updatedRows = await PayrollTemplate.query().patchAndFetchById(id, { deleted_at: deletedAt });
  
      if (!updatedRows) {
        return res.status(404).json({
          success: false,
          message: 'Payroll template not found.'
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Payroll template soft deleted successfully.',
        data: updatedRows
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error soft deleting payroll template.',
        error: error.message
      });
    }
  }

  async payrollTemplatesType(req, res) {
    try {
      const payrollTemplates = await PayrollTemplateType.query()
        .whereNull('deleted_at');
  
      return res.status(200).json({
        success: true,
        message: 'List of all payroll templates.',
        data: payrollTemplates
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving payroll templates.',
        error: error.message
      });
    }
  }
}

module.exports = new PayrollTemplateController();