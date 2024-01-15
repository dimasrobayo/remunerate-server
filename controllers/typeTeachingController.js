const typeTeaching = require('../models/typeTeaching');

module.exports = {
    index(request, response) {
        typeTeaching.getTypeTeaching((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con el registro del usuario',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de tipo de enseñanza.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },
    async create(request, response) {        
        const type = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE
        
        typeTeaching.create(type, (error, data) => {
            if(error) {
                return response.status(501).json({
                    success: false,
                    message: "Error con el registro del usuario",
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Tipo de enseñanza registrado con exito',
                data: data
            })
        })
    },
    async edit(request, response) {
        const id = request.params.id;

        typeTeaching.edit(id, (error, data) => {
            if(error) {
                return response.status(501).json({
                    success: false,
                    message: "Error con la consulta de registro",
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Tipo de enseñanza encontrado',
                data: data
            })
        })
    },
    async update(request, response) {
        const type = request.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        
        typeTeaching.update(type, (error, id) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del tipo de enseñanza',
                    error: error
                });
            }

            return response.status(201).json({
                success: true,
                message: 'El tipo de enseñanza se actualizo correctamente',
                data: `${id}`
            });
        });
    },
    async delete(request, response) {
        const id = request.params.id;

        typeTeaching.delete(id, (error, id) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error al eliminar el tipo de enseñanza',
                    error: error
                });
            }

            return response.status(201).json({
                success: true,
                message: 'El tipo de enseñanza se elimino correctamente',
                data: `${id}`
            });
        });
    },

    async hello(request,response){
      
        try {
          
          return response.status(400).json({
            success: true,
            message: 'id',
          })
        } catch (error) {
          console.log(error);
          return response.status(201).json({
            success: false,
            message: error,
          })
        }
      }
}