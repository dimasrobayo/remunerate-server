"use strict";

const Course = require('../models/Course');
const moment = require('moment')



/**
 * Controller function to handle index route.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const index = async (request, response) => {
    try {
        const courses = await Course.getCourses();
        return response.status(201).json({
            success: true,
            message: 'Listado de cursos.',
            data: courses // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
        })
    } catch (error) {
        console.error(error);
        response.status(501).send('Error en el servidor.');
    }
};

/**
 * Controller function to handle create route.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const create = async (request, response) => {

    try {
        const data = request.body 
        const courses = await Course.create(data);
        return response.status(201).json({
            success: true,
            message: 'Listado de cursos.',
            data: courses
        })
      } catch (error) {
        if (error.type == 'ModelValidation') {
          return response.status(error.statusCode).json({
            success: error.status,
            message: error.type,
            errors: error.data
          })
        } else {
          console.error('Unexpected error:', error);
          response.status(501).send('Error en el servidor.');
        }
      }
    
};

/**
 * Controller function to handle update route.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const update = async (request, response) => {
    try {
        const id = request.params.id;
        const data = request.body 
        const course = await Course.updateById(id, data);
        return response.status(201).json({
            success: true,
            message: 'El curso se actualizo correctamente',
            data: course // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
        })
    } catch (error) {
        console.error(error);
        response.status(501).send('Error en el servidor.');
    }
};

/**
 * Controller function to handle delete route.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const deleted = async (request, response) => {
    try {
        const id = request.params.id;
        const deleted_at = moment().format('YYYY-MM-DD HH:mm:ss');
        const course = await Course.updateById(id,{deleted_at: deleted_at});
        return response.status(201).json({
            success: true,
            message: 'Listado de cursos.',
            data: course // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
        })
    } catch (error) {
        console.error(error);
        response.status(501).send('Error en el servidor.');
    }
};

module.exports = {
    index,create,update,deleted
};
