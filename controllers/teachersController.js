const teachers = require('../models/teachers');

module.exports = {
    index(request, response) {
        teachers.getTeachers((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con el listado de docentes',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de dodentes.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },
    async create(request, response) {
        const teacher = request.body // SE CAPTURAN LOS DATOS QUE ME ENVIE EL CLIENTE
        
        teachers.create(teacher, (error, data) => {
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
    async teacherByDocumentNumber(request, response) {
        const documetNumber = request.params.documetNumber;

        teachers.teacherByDocumentNumber(documetNumber, (error, data) => {
            if(error) {
                return response.status(501).json({
                    success: false,
                    message: "Error con el registro la asignatura",
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Asignatura encontrada con exito',
                data: data
            })
        })
    }
}