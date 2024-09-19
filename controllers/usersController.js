const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');
const UserPersonalInfo = require('../models/UserPersonalInfo');
const UserSocialInfo = require('../models/UserSocialInfo');
const UserRoles = require('../models/UserRoles');
const UserCivilianInfo = require('../models/UserCivilianInfo');
const UserHealthInfo = require('../models/UserHealthInfo');

/**
* Controller function to handle login route.
* 
* @param {Object} request The request object from Express.
* @param {Object} response The response object from Express.
* @returns {Promise<void>} Promise indicating the completion of the function.
*/
const login = async (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    await User.transaction(async trx => {
        const user = await User.query(trx)
        .findOne({ email })
        .withGraphFetched('[roles, personalInfo.[civilianInformation, socialInformation, healthInformation, addressInformation]]');
        
        if (!user) {
            return response.status(401).json({ // EL CLIENT NO TIENE AUTORIZACION PARA REALIZAR ESTA PETICION
                success: false,
                message: 'El email no fue encontrado!'
            })
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
            
            const data = {
                id: user.id,
                name: user.personalInfo.name,
                lastname: user.personalInfo.lastname,
                mother_lastname: user.personalInfo.mother_lastname,
                type_document: user.personalInfo.type_document,
                document_number: user.personalInfo.document_number,
                gender: user.personalInfo.gender,
                email: user.email,
                phone: user.personalInfo.phone,
                image: user.personalInfo.image,
                myColor: user.my_color,
                session_token: `JWT ${token}`,
                roles: user.roles,
                civilian_information: user.personalInfo.civilianInformation,
                social_information: user.personalInfo.socialInformation,
                health_information: user.personalInfo.healthInformation,
                address_information: user.personalInfo.addressInformation
            }
            
            return response.status(200).json({
                success: true,
                message: 'El usuario fue autenticado',
                data: data
            })
        }else {
            return response.status(401).json({
                success: false,
                message: 'El password es incorrecto'
            })
        }
    })
};

/**
* Controller function to handle register route.
* 
* @param {Object} request The request object from Express.
* @param {Object} response The response object from Express.
* @returns {Promise<void>} Promise indicating the completion of the function.
*/
const register = async (request, response) => {
    try {
        // get the user 
        const user = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE

        // copy obj to toLowerCase
        let newUser = {
            ...user,
            name: user.name.toLowerCase(),
            lastname: user.lastname.toLowerCase(),
            mother_lastname: user.mother_lastname.toLowerCase(),
            document_number: user.document_number.toLowerCase(),
            email: user.email.toLowerCase(),
        }

        // add user personal info
        try {
            const personalInfo = await UserPersonalInfo.transaction(async trx => {
                // check if personalInfo by document number
                const personal_info = await UserPersonalInfo.findOneByCondition(
                    {
                        document_number: newUser.document_number
                    }
                );
                
                if (personal_info === undefined) {
                    // Here you can use the transaction.
                    let personalInfo = {
                        'name': newUser.name,
                        'lastname': newUser.lastname,
                        'mother_lastname': newUser.mother_lastname,
                        'type_document': newUser.type_document,
                        'document_number': newUser.document_number,
                        'gender': newUser.gender,
                        'phone': newUser.gender,
                        'image': null,
                    }
    
                    return await UserPersonalInfo.query(trx).insert(personalInfo);
                }
                return personal_info;
            });
            
            user.personal_info = personalInfo;
        } catch (error) {
            // Here the transaction has been rolled back.
            console.error(error);
            console.error('Error en la transacción: UserPersonalInfo', error.message);
        }

        // add user social info
        try {
            const socialInfo = await UserSocialInfo.transaction(async trx => {
                const social_info = await UserSocialInfo.findOneByCondition(
                    {
                        user_personal_info_id: user.personal_info.id
                    }
                );

                if(social_info === undefined) {
                    let socialInfo = {
                        user_personal_info_id: user.personal_info.id,
                        email: user.email,
                        phone: user.phone
                    }

                    return await UserSocialInfo.query(trx).insert(socialInfo);
                }

                return social_info;
            });

            user.social_info = socialInfo;
        } catch (error) {
            // Here the transaction has been rolled back.
            console.error(error);
            console.error('Error en la transacción: UserPersonalInfo', error.message);
        }

        // add user password
        try {
            // Promise resolving to the hashed password.
            const hash = await bcrypt.hash(user.password, 10);

            const addUser = await User.transaction(async trx => {
                const add_user = await User.findOneByCondition(
                    {
                        user_personal_info_id: user.personal_info.id
                    }
                );

                if (add_user === undefined) {
                    let add_user = {
                        'status_user_id': 2,
                        'user_personal_info_id': user.personal_info.id,
                        'email': user.email,
                        'password': hash
                    }
    
                    return await User.query(trx).insert(add_user);
                }

                return add_user;
            });

            user.user = addUser;
        } catch (error) {
            // Here the transaction has been rolled back.
            console.log(error);
            console.log('Error en la transacción: UserPersonalInfo', error.message);
        }

        // add roles by user
        try {
            const addRoles = await UserRoles.transaction(async trx => {
                const add_roles = await UserRoles.findByCondition(
                    {
                        users_id: user.user.id,
                        roles_id: user.rol
                    }
                );

                if (add_roles === undefined) {
                    let add_roles = {
                        'user_id': user.user.id,
                        'role_id': 2
                    }
    
                    return await UserRoles.query(trx).insert(add_roles);
                }

                return add_roles;
            });

            user.roles = addRoles;
        } catch (error) {
            // Here the transaction has been rolled back.
            console.log(error);
            console.log('Error en la transacción: UserPersonalInfo', error.message);
        }

        return response.status(200).json({
            success: true,
            message: 'Usuario registrado con exito',
            data: user
        })
    } catch (error) {
        // Here the transaction has been rolled back.
        console.log(error);
        console.log('Error en la transacción: UserPersonalInfo', error.message);
    }
};

/**
* Controller function to handle register with image route.
* 
* @param {Object} request The request object from Express.
* @param {Object} response The response object from Express.
* @returns {Promise<void>} Promise indicating the completion of the function.
*/
const registerWithImage = async (request, response) => {
    try {
        // get the user 
        const user = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE

        // copy obj to toLowerCase
        let newUser = {
            ...user,
            name: user.name.toLowerCase(),
            lastname: user.lastname.toLowerCase(),
            mother_lastname: user.mother_lastname.toLowerCase(),
            document_number: user.document_number.toLowerCase(),
            email: user.email.toLowerCase(),
        }

        const files = request.files;

        if (files && files.length > 0) {
            // DAMOS NOMBRE UNICO A LA IMAGEN PARA EVITAR COLISIONES
            const fileBuffer = `profile_${Date.now()}`;

            // RUTA DONDE SE VA A GUARDAR EL ARCHIVO LOCAL
            const uploadPath = path.join(__dirname, '../storage/', fileName);

            fs.writeFile(uploadPath, fileBuffer, (error) => {
                if (error) {
                    return response.status(501).json({
                        success: false,
                        message: 'Error al guardar el registro',
                        error: error
                    })
                }
            
                // CONSTRUIR LA URL DEL ARCHIVO PARA APLICARLA A 
                const fileUrl = '/storage/' + fileName;
            
                if (url != undefined && url != null) {
                    user.image = fileUrl;
                }
            });


        }
    
        // add user personal info
        try {
            const personalInfo = await UserPersonalInfo.transaction(async trx => {
                // check if personalInfo by document number
                const personal_info = await UserPersonalInfo.findOneByCondition(
                    {
                        document_number: newUser.document_number
                    }
                );
                
                if (personal_info === undefined) {
                    // Here you can use the transaction.
                    let personalInfo = {
                        'name': newUser.name,
                        'lastname': newUser.lastname,
                        'mother_lastname': newUser.mother_lastname,
                        'type_document': newUser.type_document,
                        'document_number': newUser.document_number,
                        'gender': newUser.gender,
                        'phone': newUser.gender,
                        'image': null,
                    }
    
                    return await UserPersonalInfo.query(trx).insert(personalInfo);
                }
                return personal_info;
            });
            
            user.personal_info = personalInfo;
        } catch (error) {
            // Here the transaction has been rolled back.
            console.error(error);
            console.error('Error en la transacción: UserPersonalInfo', error.message);
        }

        // add user social info
        try {
            const socialInfo = await UserSocialInfo.transaction(async trx => {
                const social_info = await UserSocialInfo.findOneByCondition(
                    {
                        user_personal_info_id: user.personal_info.id
                    }
                );

                if(social_info === undefined) {
                    let socialInfo = {
                        user_personal_info_id: user.personal_info.id,
                        email: user.email,
                        phone: user.phone
                    }

                    return await UserSocialInfo.query(trx).insert(socialInfo);
                }

                return social_info;
            });

            user.social_info = socialInfo;
        } catch (error) {
            // Here the transaction has been rolled back.
            console.error(error);
            console.error('Error en la transacción: UserPersonalInfo', error.message);
        }

        // add user password
        try {
            // Promise resolving to the hashed password.
            const hash = await bcrypt.hash(user.password, 10);

            const addUser = await User.transaction(async trx => {
                const add_user = await User.findOneByCondition(
                    {
                        user_personal_info_id: user.personal_info.id
                    }
                );

                if (add_user === undefined) {
                    let add_user = {
                        'status_user_id': 2,
                        'user_personal_info_id': user.personal_info.id,
                        'email': user.email,
                        'password': hash
                    }
    
                    return await User.query(trx).insert(add_user);
                }

                return add_user;
            });

            user.user = addUser;
        } catch (error) {
            // Here the transaction has been rolled back.
            console.log(error);
            console.log('Error en la transacción: UserPersonalInfo', error.message);
        }

        // add roles by user
        try {
            const addRoles = await UserRoles.transaction(async trx => {
                const add_roles = await UserRoles.findByCondition(
                    {
                        users_id: user.user.id,
                        roles_id: user.rol
                    }
                );

                if (add_roles === undefined) {
                    let add_roles = {
                        'user_id': user.user.id,
                        'role_id': 2
                    }
    
                    return await UserRoles.query(trx).insert(add_roles);
                }

                return add_roles;
            });

            user.roles = addRoles;
        } catch (error) {
            // Here the transaction has been rolled back.
            console.log(error);
            console.log('Error en la transacción: UserPersonalInfo', error.message);
        }

        return response.status(200).json({
            success: true,
            message: 'Usuario registrado con exito',
            data: user
        })
    } catch (error) {
        // Here the transaction has been rolled back.
        console.log(error);
        console.log('Error en la transacción: UserPersonalInfo', error.message);
    }
};

/**
 * Controller function to handle fetching a user by ID.
 * 
 * @param {Object} request - The request object from Express, containing the parameters and query.
 * @param {Object} response - The response object from Express, used to send the response back to the client.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const findUsersById = async (request, response) => {
    const id = request.params.id;
    
    try {
        // Check if user by id
        const getUser = await User.query()
            .findById(id)
            .withGraphFetched('[status, personalInfo.[civilianInformation, socialInformation, healthInformation, addressInformation], roles]');
        
        if(getUser) {
            const { status, personalInfo, roles } = getUser;
            let user = {
                id: getUser.id,
                personal_info: getUser.user_personal_info_id,
                name: personalInfo.name,
                lastname: personalInfo.lastname,
                mother_lastname: personalInfo.mother_lastname,
                type_document: personalInfo.type_document,
                document_number: personalInfo.document_number,
                status: status.description,
                email: getUser.email,
                gender: personalInfo.gender,
                phone: personalInfo.phone,
                image: personalInfo.image,
                roles: roles,
                civilian_information: personalInfo.civilianInformation,
                social_information: personalInfo.socialInformation,
                health_information: personalInfo.healthInformation,
                address_information: personalInfo.addressInformation
            }
            
            return response.status(200).json({
                success: true,
                message: 'Registro encontrado',
                data: user
            });
        } else {
            return response.status(404).json({
                success: false,
                message: 'Registro no encontrado'
            });
        }
    } catch (error) {
        console.error('Error en la operación', error.message);
        return response.status(500).json({
            success: false,
            message: 'Error en la operación',
            error: error.message
        });
    }
};

/**
 * Controller function to handle fetching a user by user.
 * 
 * @param {Object} request - The request object from Express, containing the parameters and query.
 * @param {Object} response - The response object from Express, used to send the response back to the client.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const findByUsers = async (request, response) => {
    try {
        // Retrieve all users with related status and personalInfo
        const users = await User.query()
        .withGraphFetched('[status, personalInfo]');
        
        if(users.length > 0) {
            // Map the retrieved users to a more structured response format
            const formattedUsers = users.map(user => ({
                id: user.id,
                personal_info: user.user_personal_info_id,
                name: user.personalInfo.name,
                lastname: user.personalInfo.lastname,
                mother_lastname: user.personalInfo.mother_lastname,
                type_document: user.personalInfo.type_document,
                document_number: user.personalInfo.document_number,
                status: user.status.description,
                email: user.email,
                gender: user.personalInfo.gender,
                phone: user.personalInfo.phone,
                image: user.personalInfo.image
            }));

            return response.status(200).json({
                success: true,
                message: 'Listado de usuarios',
                data: formattedUsers
            });
        } else {
            return response.status(404).json({
                success: false,
                message: 'No se encontraron usuarios'
            });
        }
    } catch (error) {
        console.error('Error en la operación', error.message);
        return response.status(500).json({
            success: false,
            message: 'Error en la operación',
            error: error.message
        });
    }
};

const updateWithImage = async (req, res) => {
    const user = eq.body.user; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
    const files = req.files;

    if(files.length > 0) {
        // DAMOS NOMBRE UNICO A LA IMAGEN PARA EVITAR COLISIONES
        const fileBuffer = `profile_${Date.now()}`;

        // RUTA DONDE SE VA A GUARDAR EL ARCHIVO LOCAL
        const uploadPath = path.join(__dirname, '../storage/', fileName);

        fs.writeFile(uploadPath, fileBuffer, (error) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Error al guardar el registro',
                    error: error
                })
            }
        
            // CONSTRUIR LA URL DEL ARCHIVO PARA APLICARLA A 
            const fileUrl = '/storage/' + fileName;
        
            if (url != undefined && url != null) {
                user.image = fileUrl;
            }
        });
    }

    User.updateWithImage(user, (err, data) => {
        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: err
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Usuario actualizado correctamente',
            data: user
        });
    

    });

};

/**
 * Controller function to update a user without an image.
 * 
 * @param {Object} request - The request object from Express.
 * @param {Object} request.body - The request body containing user data.
 * @param {Object} response - The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const updateWithoutImage = async (request, response) => {
    const userId = request.body.id;

    const {
        name,
        lastname,
        mother_lastname,
        type_document,
        document_number,
        gender,
        phone,
        my_color,
        roles,
        civilian_information,
        social_information,
        health_information
    } = request.body;

    try {
        // Search the user by their ID with all related data
        const user = await User.query()
            .findById(userId)
            .withGraphFetched('[personalInfo, roles, personalInfo.civilianInformation, personalInfo.socialInformation, personalInfo.healthInformation]');
        
        if (!user) {
            return response.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Begin transaction for update user data
        await User.transaction(async trx => {
            // Update User Data
            await User.query(trx)
            .patchAndFetchById(userId, {
                my_color: my_color
            })

            // Update UserPersonalInfo Data
            await UserPersonalInfo.query(trx)
                .patchAndFetchById(user.user_personal_info_id, {
                    name,
                    lastname,
                    mother_lastname,
                    type_document,
                    document_number,
                    gender,
                    phone
                });

            // Update UserCivilianInfo Data
            if (user.personalInfo.civilianInformation) {
                await UserCivilianInfo.query(trx)
                    .patchAndFetchById(user.personalInfo.civilianInformation.id, civilian_information);
            }

            // Update UserSocialInfo Data
            if (user.personalInfo.socialInformation) {
                await UserSocialInfo.query(trx)
                    .patchAndFetchById(user.personalInfo.socialInformation.id, social_information);
            }

            // Update UserHealthInfo Data
            if (user.personalInfo.healthInformation) {
                await UserHealthInfo.query(trx)
                    .patchAndFetchById(user.personalInfo.healthInformation.id, health_information);
            }

            // Update Roles Data
            await user.$relatedQuery('roles', trx).unrelate();
            await user.$relatedQuery('roles', trx).relate(roles.id);
        });

        // Fetch the updated user data
        const updatedUser = await User.query()
            .findById(userId)
            .withGraphFetched('[roles, personalInfo.[civilianInformation, socialInformation, healthInformation, addressInformation]]');

        // Structure the response data
        const data = {
            id: updatedUser.id,
            personal_info: updatedUser.user_personal_info_id,
            name: updatedUser.personalInfo.name,
            lastname: updatedUser.personalInfo.lastname,
            mother_lastname: updatedUser.personalInfo.mother_lastname,
            type_document: updatedUser.personalInfo.type_document,
            document_number: updatedUser.personalInfo.document_number,
            status: updatedUser.status ? updatedUser.status.description : null,
            email: updatedUser.email,
            gender: updatedUser.personalInfo.gender,
            phone: updatedUser.personalInfo.phone,
            myColor: updatedUser.my_color,
            image: updatedUser.personalInfo.image,
            roles: updatedUser.roles,
            civilian_information: updatedUser.personalInfo.civilianInformation,
            social_information: updatedUser.personalInfo.socialInformation,
            health_information: updatedUser.personalInfo.healthInformation,
            address_information: updatedUser.personalInfo.addressInformation
        };

        return response.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            data: data
        });
    } catch (error) {
        console.error('Error en la operación', error.message);
        return response.status(500).json({
            success: false,
            message: 'Error en la operación',
            error: error.message
        });
    }
};

module.exports = {
    login,
    register,
    registerWithImage,
    findByUsers,
    findUsersById,
    updateWithImage,
    updateWithoutImage
}