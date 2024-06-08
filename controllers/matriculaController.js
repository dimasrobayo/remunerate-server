//const grades = require('../models/grades');

module.exports = {
    index(request, response) {
        return response.status(201).json({
            success: true,
            message: 'Listado de matriculas.',
        })
    },
    async create(request, response) {
        return response.status(201).json({
            success: true,
            message: 'Matricula registrada con exito',
            //data: data
        })
    },
    async update(request, response) {
        return response.status(201).json({
            success: true,
            message: 'Matricula actualizada con exito',
            //data: data
        })
    },
    async delete(request, response) {
        return response.status(201).json({
            success: true,
            message: 'Matricula eliminada con exito',
            //data: data
        })
    }
}