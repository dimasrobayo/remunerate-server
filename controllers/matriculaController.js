const _ = require('lodash');
const moment = require('moment');

const validateData = require('../constraints/matricula/rules');


const courses = require('../models/Course');
const Matricula = require('../models/Matricula');
const UserPersonalInfo = require('../models/UserPersonalInfo');
const UserCivilianInfo = require('../models/UserCivilianInfo');
const UserSocialInfo = require('../models/UserSocialInfo');
const UserAddress = require('../models/UserAddress');
const UserAddressPersonalInfo = require('../models/UserAddressPersonalInfo');
const SchoolPeriod = require('../models/SchoolPeriod');
const MatriculaModality = require('../models/MatriculaModality');
const Community = require('../models/Community');
const MatriculaObservation = require('../models/MatriculaObservation')



/**
 * Controller function to handle index route.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const index = async (request, response) => {
    try {
        const matricula = await Matricula.get({});
        return response.status(201).json({
            success: true,
            message: 'Listado de cursos.',
            data: matricula 
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
        const obj = request.body;
        // get the user who upload file by jwt
        const user = request.user
        // copy obj to toLowerCase
        let student = {
            ...obj,
            name: obj.name.toLowerCase(),
            lastname: obj.lastname.toLowerCase(),
            mother_lastname: obj.mother_lastname.toLowerCase(),
            birthdate: moment(obj.date_birth, 'MM/DD/YYYY').format('MM-DD-YYYY'),
            phone: obj.phone,
            phone_aux: obj.phone_aux,
            email: obj.email.toLowerCase(),
            country_birth: '',
            nationality: '',
            observaciones: '',
            codigo_postal: null,
            department_number: 'No especificado',
            cod_modality: '0001'
        };
        // get computed values db
        const course = await courses.getCoursesByCodeGradeAndCourseName(
            {
                letter_course: student.letter_course,
                code_grade: student.cod_grade,
                cod_type_teacher: student.cod_type_teacher
            },
        );
        // add school period
        const sysSchool = await SchoolPeriod.findOneByCondition({ id: student.sys_school_id });
        // add matricula modality
        const matriculaModal = await MatriculaModality.findOneByCondition({ id: student.cod_modality_id });
        // check by address fields array with sys_comunity
        for (let index = 0; index < student.address.length; index++) {
            const address = student.address[index];
            let comunity = await Community.findOneByCondition({ id: address.sys_community_id });
            if (comunity === undefined) {
                student.address.splice(index, 1);
            }
        }

        student = { ...student, course, sysSchool, matriculaModal };

        // validate students data rules
        const studentsValidate = validateData(student, 'create');

        // check if any error
        if (studentsValidate) {
            try {
                const personalInfo = await UserPersonalInfo.transaction(async trx => {
                    // check if personalInfo by document number
                    const personal_info = await UserPersonalInfo.findOneByCondition(
                        {
                            document_number: student.document_number
                        }
                    );
                    if (personal_info === undefined) {
                        // Here you can use the transaction.
                        let personalInfo = {
                            'name': student.name,
                            'lastname': student.lastname,
                            'mother_lastname': student.mother_lastname,
                            'type_document': student.type_document,
                            'document_number': student.document_number,
                            'gender': student.gender,
                            'phone': student.gender,
                            'image': null,
                        }
                        return await UserPersonalInfo.query(trx).insert(personalInfo);
                    }
                    return personal_info;
                });
                student.personal_info = personalInfo;
                // Here the transaction has been committed.
            } catch (error) {
                // Here the transaction has been rolled back.
                console.error(error);
                console.error('Error en la transacción: UserPersonalInfo', error.message);
            }


            // save address
            try {
                const addressModels = await UserAddress.transaction(async trx => {
                    let userAddressIds = [];
                    for (let index = 0; index < student.address.length; index++) {
                        const addressModel = await UserAddress.query(trx).insert(student.address[index]);
                        await UserAddressPersonalInfo.query(trx).insert({
                            address_id: addressModel.id,
                            user_personal_info_id: student.personal_info.id
                        })
                        userAddressIds.push({ address: addressModel });
                    }

                    return userAddressIds
                });

                student.address = addressModels;
                // Here the transaction has been committed.
            } catch (error) {
                // Here the transaction has been rolled back.
                console.error(error);
                console.error('Error en la transacción: address', error.message);
            }
            // save userCivilianInfo
            try {
                const civilianInfo = await UserCivilianInfo.transaction(async trx => {
                    let ifstudentsCivilian = await UserCivilianInfo.findOneByCondition({
                        user_personal_info_id: student.personal_info.id
                    })
                    if (ifstudentsCivilian == undefined) {
                        let civilian = {
                            user_personal_info_id: student.personal_info.id,
                            birthdate: student.birthdate,
                            country_birth: student.country_birth,
                            nationality: student.nationality,
                            observaciones: student.observaciones
                        }
                        return await UserCivilianInfo.query(trx).insert(civilian)
                    }

                    return ifstudentsCivilian
                });
                console.log(JSON.stringify(civilianInfo, null, 2));
                student.civilianInfo = civilianInfo;
                // Here the transaction has been committed.
            } catch (error) {
                // Here the transaction has been rolled back.
                console.error(error);
                console.error('Error en la transacción: UserCivilianInfo', error.message);
            }
            // save UserSocialInfo
            try {
                const socialInfo = await UserSocialInfo.transaction(async trx => {
                    let ifstudentsSocial = await UserSocialInfo.findOneByCondition({
                        user_personal_info_id: student.personal_info.id
                    })
                    if (ifstudentsSocial == undefined) {
                        let social = {
                            user_personal_info_id: student.personal_info.id,
                            email: student.email,
                            phone: student.phone
                        }
                        return await UserSocialInfo.query(trx).insert(social)
                    }

                    return ifstudentsSocial
                });
                student.socialInfo = socialInfo;
                // Here the transaction has been committed.
            } catch (error) {
                // Here the transaction has been rolled back.
                console.error(error);
                console.error('Error en la transacción: UserCivilianInfo', error.message);
            }
            // save matricula
            try {
                const sys_matricula = await Matricula.transaction(async trx => {
                    let sys_courses_id = student.course[0].curso_id;
                    let cod_matricula = `${student.document_number}_${sys_courses_id}_${student.sysSchool.año_escolar}`;

                    let ifMatriculaExits = await Matricula.findOneByCondition(
                        { cod_matricula: cod_matricula,deleted_at:null }
                    );

                    if (ifMatriculaExits === undefined) {
                        let create_date = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS');
                        let date_matricula = moment().format('YYYY-MM-DD');
                        let create_by = user.id;

                        const matricula = {
                            "cod_matricula": cod_matricula,
                            "date_matricula": date_matricula,
                            "create_at": create_date,
                            "create_by": create_by,
                            "user_personal_info_id": student.personal_info.id,
                            "sys_courses_id": sys_courses_id,
                            "sys_school_period_id": student.sysSchool.id,
                            "sys_matricula_modality_id": student.matriculaModal.id
                        }

                        return await Matricula.query(trx).insert(matricula);
                    }

                    return ifMatriculaExits;
                });
                student.sys_matricula_id = sys_matricula.id;
                // Here the transaction has been committed.
            } catch (error) {
                // Here the transaction has been rolled back.
                console.error(error);
                console.error('Error en la transacción: Matricula', error.message);
            }
            // save MatriculaObservation
            try {
                const sys_matricula_observation = await MatriculaObservation.transaction(async trx => {
                    let ifObservation = await MatriculaObservation.findOneByCondition({
                        name: student.observation.name,
                        sys_matriculas_id: student.sys_matricula_id
                    })
                    if (ifObservation == undefined) {
                        let observation = {
                            "type_observation": student.observation.type,
                            "date_observation": moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                            "description": student.observation.description,
                            "name": student.observation.name,
                            "sys_matriculas_id": student.sys_matricula_id
                        }
                        return await MatriculaObservation.query(trx).insert(observation)
                    }

                    return ifObservation
                });
                student.sys_matricula_observation_id = sys_matricula_observation.id;
                // Here the transaction has been committed.
            } catch (error) {
                // Here the transaction has been rolled back.
                console.error(error);
                console.error('Error en la transacción: MatriculaObservation', error.message);
            }

        }

        return response.status(201).json({
            success: true,
            message: 'Matricula registrada con exito',
            data: student,
            studentsValidate
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
    return response.status(201).json({
        success: true,
        message: 'Matricula actualizada con exito',
        //data: data
    })
};


/**
 * Controller function to handle delete route.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const delete_at = async (request, response) => {
    try {
        const id = request.params.id;
        const deleted_at = moment().format('YYYY-MM-DD HH:mm:ss');
        const matricula = await Matricula.updateById(id,{deleted_at: deleted_at});
        return response.status(201).json({
            success: true,
            message: 'Eliminada matricula.',
            data: matricula 
        })
    } catch (error) {
        console.error(error);
        response.status(501).send('Error en el servidor.');
    }
};

module.exports = {
    index,
    create,
    update,
    delete_at
}

