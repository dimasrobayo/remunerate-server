const utils = require('../models/utils');

module.exports = {
    async getRegions(request, response) {
        utils.getRegions((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con listado de regiones',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de regiones.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },
    async communityByRegions(request, response) {
        const id = request.params.id;

        utils.communityByRegions(id, (error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con listado de regiones',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de comunas.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })  
        })
    },
    async getCountries(request, response) {
        utils.getCountries((error, data) => {
            if(error){
                return response.status(501).json({
                    success: false,
                    message: 'Error con listado de paises',
                    error: 'Algo salio mal!'
                })
            }
            return response.status(201).json({
                success: true,
                message: 'Listado de paises.',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            })
        })
    },
}