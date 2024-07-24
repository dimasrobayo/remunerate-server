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
        const users = await UserPersonalInfo.query()
            .withGraphFetched('[socialInformation, addressInformation.community.province.region, civilianInformation, healthInformation, healthPension, paymentMethod.company]');

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
            .withGraphFetched('[socialInformation, addressInformation.community.province.region, civilianInformation, healthInformation, healthPension, paymentMethod, paymentMethod.company]')
            .modifyGraph('addressInformation.community.province.region', builder => {
                builder.select('id as sys_regions_id');
            });

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
        console.error(error)
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

        const userPersonalInfoId = updatedUser.id;

        // Actualiza o inserta los datos anidados si están presentes en la solicitud
        if (civilianInformation) {
            await updatedUser.$relatedQuery('civilianInformation').insert({
                ...civilianInformation,
                user_personal_info_id: userPersonalInfoId
            }).onConflict('user_personal_info_id').merge();
        }

        if (socialInformation) {
            await updatedUser.$relatedQuery('socialInformation').insert({
                ...socialInformation,
                user_personal_info_id: userPersonalInfoId
            }).onConflict('user_personal_info_id').merge();
        }

        if (healthInformation) {
            await updatedUser.$relatedQuery('healthInformation').insert({
                ...healthInformation,
                user_personal_info_id: userPersonalInfoId
            }).onConflict('user_personal_info_id').merge();
        }

        if (addressInformation && addressInformation.length > 0) {
            // Primero elimina las direcciones antiguas
            await updatedUser.$relatedQuery('addressInformation').delete();
    
            // Procesar cada dirección para extraer y asignar valores
            const processedAddressInformation = addressInformation.map(({ address, codigo_postal, department_number, housing_type, block, sys_community_id }) => ({
                address,
                codigo_postal,
                department_number,
                housing_type,
                block,
                sys_community_id
            }));
    
            // Luego agrega las nuevas direcciones
            await updatedUser.$relatedQuery('addressInformation').insertGraph(processedAddressInformation);
        }

        if (healthPension) {
            await updatedUser.$relatedQuery('healthPension').insert({
                ...healthPension,
                user_personal_info_id: userPersonalInfoId
            }).onConflict('user_personal_info_id').merge();
        }

        if (paymentMethod) {
            await updatedUser.$relatedQuery('paymentMethod').insert({
                ...paymentMethod,
                user_personal_info_id: userPersonalInfoId
            }).onConflict('user_personal_info_id').merge();
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
