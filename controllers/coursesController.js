const courses = require('../models/courses');

module.exports = {
    index(request, response) {
        courses.getCourses((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con el listado de cursos',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de cursos.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },
    async create(request, response) {
        const course = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE
        
        courses.create(course, (error, data) => {
            if(error) {
                return response.status(501).json({
                    success: false,
                    message: "Error con el registro del curso",
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Curso registrado con exito',
                data: data
            })
        })
    },
    async update(request, response) {
        const course = request.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        
        courses.update(course, (error, id) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del curso',
                    error: error
                });
            }

            return response.status(201).json({
                success: true,
                message: 'El curso se actualizo correctamente',
                data: `${id}`
            });
        });
    },
    async delete(request, response) {
        const id = request.params.id;

        courses.delete(id, (error, id) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error al eliminar el curso',
                    error: error
                });
            }

            return response.status(201).json({
                success: true,
                message: 'El curso se elimino correctamente',
                data: `${id}`
            });
        });
    }
}