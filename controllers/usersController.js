const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Rol = require('../models/rol');
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = {
    async register(request, response) {
        const user = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE
        User.register(user, (error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con el registro del usuario',
                    error: user
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Registro se realizo correctamente',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },

    async registerWithImage(request, response) {
        const { user } = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE
        const files = request.files;

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

        User.create(user, (error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con el registro del usuario',
                    error: user
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Registro se realizo correctamente',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },

    async login(request, response) {
        const email = request.body.email;
        const password = request.body.password;
        
        User.findByEmail(email, async(error, myUser) => {
            if(error) {
                return response.status(501).json({
                    success: false,
                    massage: 'Hubo un error con el registro del usuario',
                    error: error
                })
            }
            
            if(!myUser) {
                return response.status(401).json({ // EL CLIENT NO TIENE AUTORIZACION PARA REALIZAR ESTA PETICION
                    success: false,
                    message: 'El email no fue encontrado!'
                })
            }
            
            const isPasswordValid = await bcrypt.compare(password, myUser.password)
            
            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id:                     myUser.id,
                    name:                   myUser.name,
                    lastname:               myUser.lastname,
                    mother_lastname:        myUser.mother_lastname,
                    type_document:          myUser.type_document,
                    document_number:        myUser.document_number,
                    gender:                 myUser.gender,
                    email:                  myUser.email,
                    phone:                  myUser.phone,
                    image:                  myUser.image,
                    myColor:                myUser.my_color,
                    session_token:          `JWT ${token}`,
                    roles:                  JSON.parse(myUser.roles),
                    civilian_information:   myUser.civilian_information,
                    social_information:     myUser.social_information,
                    health_information:     myUser.health_information,
                    address_information:    myUser.address_information,
                }

                return response.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data:data
                })
            }else{
                return response.status(401).json({
                    success: false, 
                    message: 'El password es incorrecto'
                })
            }
        })
    },

    async findByUsers(request, response) {
        User.findByUsers((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error al obtener los usuarios',
                    error: error
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de usuarios',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },

    async findUsersById(request, response) {
        const id = request.params.id;

        User.findUsersById(id, (error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error al obtener el usuario',
                    error: error
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de usuarios',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        });
    },

    async updateWithImage(req, res) {
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

    },

    async updateWithoutImage(req, res) {
        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        User.updateWithOutImage(user, (err, user) => {
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

    }
}