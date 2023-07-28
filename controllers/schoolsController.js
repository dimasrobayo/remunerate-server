const Schools = require('../models/schools');

module.exports = {
    getAll(request, response) {
        const connection = request.db; // Conection for tenant

        Schools.getAll(connection, (err, data) => {
            if (err) {
                return response.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los datos del colegio',
                    error: err
                });
            }

            return response.status(201).json({
                success: true,
                message: 'El Colegio es nuestro cliente',
                data:data
            })
        });
    },
}