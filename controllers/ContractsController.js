const ContractsEmployee = require('../models/ContractsEmployee');

/**
 * Controller function to handle getting all contracts records.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const index = async (request, response) => {
    const { id } = request.params;
    
    try {
        const contracts = await ContractsEmployee.query()
            .withGraphFetched(`
                [
                    userPersonalInfo.paymentMethod.company, 
                    agrupacionSeguridad, 
                    area_employees, 
                    cargo_employees, 
                    sede_employees, 
                    centroCosto, 
                    sindicato_employees, 
                    supervisorDirecto, 
                    categoriaIne, 
                    ocupacion_employees
                ]
            `)
            .where('user_personal_info_id', id)
            .whereNull('deleted_at');

        return response.status(200).json({
            success: true,
            message: 'List of contracts!',
            data: contracts
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle creating a new user personal info record.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const create = async (request, response) => {
    try {
        // Inserta el nuevo usuario junto con la información relacionada
        const newContracts = await ContractsEmployee.query().insertGraph(request.body, {
            relate: true,  // Asegura que se relacionen correctamente los datos existentes
            allowRefs: true // Permite la referencia de datos existentes si es necesario
        });

        return response.status(200).json({
            success: true,
            message: 'Contrato creado con exito!',
            data: newContracts
        });
    } catch (error) {
        console.error('Error creando contrato:', error); // Mejora la depuración
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle updating an existing contracts record.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const update = async (request, response) => {
    const { id } = request.params; // Obtener el ID del contrato a actualizar
    const formData = request.body; // Obtener los datos actualizados desde el cuerpo de la solicitud
    
    try {
        // Verificar si el contrato existe
        const existingContract = await ContractsEmployee.query().where('user_personal_info_id', id).whereNull('deleted_at');

        if (!existingContract) {
            return response.status(404).json({
                success: false,
                message: 'Contract not found'
            });
        }

        console.log(formData);
        // Actualizar el registro del contrato con los datos proporcionados
        const updatedContract = await ContractsEmployee.query()
            .patchAndFetchById(id, {...formData});

        return response.status(200).json({
            success: true,
            message: 'Contract updated successfully!',
            data: updatedContract
        });
    } catch (error) {
        console.error('Error updating contract:', error); // Mejora la depuración
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle soft deleting a contracts employee record.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const softDelete = async (request, response) => {
    const { id } = request.params; // Obtener el ID del contrato a eliminar (soft delete)

    try {
        // Establecer la fecha de eliminación lógica
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Actualizar el registro con la fecha de eliminación lógica
        const deletedContract = await ContractsEmployee.query().patchAndFetchById(id, { deleted_at: deletedAt });

        // Verificar si el contrato fue encontrado
        if (!deletedContract) {
            return response.status(404).json({
                success: false,
                message: 'Contract not found!'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Contract soft deleted successfully!',
            data: deletedContract
        });
    } catch (error) {
        console.error('Error soft deleting contract:', error); // Mejora la depuración
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    index,
    create,
    update,
    softDelete
};