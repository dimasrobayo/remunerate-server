const subjects = require('../models/subjects');

module.exports = {
    async index(request, response) {
        subjects.getSubjects((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con el listado de asignaturas',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de asignaturas.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },
    async create(request, response) {
        const subject = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE
        
        subjects.create(subject, (error, data) => {
            if(error) {
                return response.status(501).json({
                    success: false,
                    message: "Error con el registro la asignatura",
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Asignatura registrada con exito',
                data: data
            })
        })
    },
    async update(request, response) {
        const subject = request.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        console.log('subject' + JSON.stringify(subject, null, 3))

        subjects.update(subject, (error, id) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion la asigunatura',
                    error: error
                });
            }

            return response.status(201).json({
                success: true,
                message: 'La asignatura se actualizo correctamente',
                data: `${id}`
            });
        });
    },
    async delete(request, response) {
        const id = request.params.id;

        subjects.delete(id, (error, id) => {
            if (error) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error al eliminar la asignatura',
                    error: error
                });
            }

            return response.status(201).json({
                success: true,
                message: 'La asignatura se elimino correctamente',
                data: `${id}`
            });
        });
    }
}