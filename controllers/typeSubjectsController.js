const typeSubjects = require('../models/typeSubjects');

module.exports = {
    index(request, response) {
        typeSubjects.getTypeSubjects((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con el listado de tipo de asignaturas',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de tipo de asignaturas.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },
}