const UserPersonalInfo = require('../models/UserPersonalInfo');
const UserSocialInfo = require('../models/UserSocialInfo');
const UserAddress = require('../models/UserAddress');
const UserAddressPersonalInfo = require('../models/UserAddressPersonalInfo');
const UserCivilianInfo = require('../models/UserCivilianInfo');
const UserHealthInfo = require('../models/UserHealthInfo');
const UserHealthPension = require('../models/UserHealthPension');
const UserPaymentMethod = require('../models/UserPaymentMethod');

/**
 * Controller function to handle getting all user personal info records.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const index = async (request, response) => {
    try {
        const users = await UserPersonalInfo.query().whereNull('deleted_at')
            .withGraphFetched('[socialInformation, addressInformation, civilianInformation, healthInformation, healthPension, paymentMethod]');

        return response.status(200).json({
            success: true,
            message: 'List of users!',
            data: users
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle getting a user personal info record by ID.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const getUserById = async (request, response) => {
    const { id } = request.params;
    try {
        const user = await UserPersonalInfo.query().findById(id).whereNull('deleted_at')
            .withGraphFetched('[socialInformation, addressInformation, civilianInformation, healthInformation, healthPension, paymentMethod]');

        if (!user) {
            return response.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'User details!',
            data: user
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
        const newUser = await UserPersonalInfo.query().insertGraph(request.body, {
            relate: true,  // Asegura que se relacionen correctamente los datos existentes
            allowRefs: true // Permite la referencia de datos existentes si es necesario
        });

        return response.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error); // Mejora la depuración
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle updating an existing user personal info record.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const update = async (request, response) => {
    const { id } = request.params;
    const {
        name,
        lastname,
        mother_lastname,
        type_document,
        document_number,
        gender,
        phone,
        image,
        civilianInformation,
        socialInformation,
        healthInformation,
        addressInformation,
        healthPension,
        paymentMethod
    } = request.body;

    try {
        // Convertir afp_date al formato correcto
        if (healthPension && healthPension.afp_date) {
            const afpDate = new Date(healthPension.afp_date);
            healthPension.afp_date = afpDate.toISOString().slice(0, 19).replace('T', ' ');
        }

        // Primero, actualiza el modelo principal
        const updatedUser = await UserPersonalInfo.query().patchAndFetchById(id, {
            name,
            lastname,
            mother_lastname,
            type_document,
            document_number,
            gender,
            phone,
            image
        });

        if (!updatedUser) {
            return response.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        // Actualiza los datos anidados si están presentes en la solicitud
        if (socialInformation) {
            await updatedUser.$relatedQuery('socialInformation').patch(socialInformation);
        }
        if (healthInformation) {
            await updatedUser.$relatedQuery('healthInformation').patch(healthInformation);
        }
        if (addressInformation) {
            // Primero elimina las direcciones antiguas
            await updatedUser.$relatedQuery('addressInformation').delete();
            // Luego agrega las nuevas direcciones
            await updatedUser.$relatedQuery('addressInformation').insertGraph(addressInformation);
        }
        if (healthPension) {
            await updatedUser.$relatedQuery('healthPension').patch(healthPension);
        }
        if (paymentMethod) {
            await updatedUser.$relatedQuery('paymentMethod').patch(paymentMethod);
        }

        return response.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: updatedUser
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Controller function to handle soft deleting a user personal info record.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const softDelete = async (request, response) => {
    const { id } = request.params;
    try {
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const deletedUser = await UserPersonalInfo.query().patchAndFetchById(id, { deleted_at: deletedAt });

        if (!deletedUser) {
            return response.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'User deleted successfully!'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    index,
    getUserById,
    create,
    update,
    softDelete
};
