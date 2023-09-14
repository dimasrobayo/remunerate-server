const grades = require('../models/grades');

module.exports = {
    index(request, response) {
        grades.getGrades((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con el registro del usuario',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de grado.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },
    async create(request, response) {
        const grade = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE
        
        grades.create(grade, (error, data) => {
            if(error) {
                return response.status(501).json({
                    success: false,
                    message: "Error con el registro del usuario",
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Grado registrado con exito',
                data: data
            })
        })
    },
    async update(request, response) {
        const grade = request.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        
        grades.update(grade, (error, id) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del grado',
                    error: error
                });
            }

            return response.status(201).json({
                success: true,
                message: 'El grado se actualizo correctamente',
                data: `${id}`
            });
        });
    },
    async delete(request, response) {
        const id = request.params.id;

        grades.delete(id, (error, id) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error al eliminar el grado',
                    error: error
                });
            }

            return response.status(201).json({
                success: true,
                message: 'El grado se elimino correctamente',
                data: `${id}`
            });
        });
    }
}