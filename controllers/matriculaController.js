const _ = require('lodash');
const moment = require('moment');

const validateData = require('../constraints/matricula/rules');
const dbSchool = require('../db');

const courses = require('../models/courses');
const sysMatricula = require('../models/sysMatricula');
const userPersonalInfo = require('../models/userPersonalInfo');
const userCivilianInfo = require('../models/userCivilianInfo');
const userSocialInfo = require('../models/userSocialInformation');
const userAddresses = require('../models/userAddresses');
const userAddressesPersonalInfo = require('../models/userAddressesPersonalInfo');
const sysSchoolPeriod = require('../models/sysSchoolPeriod');
const sysMatriculaModality = require('../models/sysMatriculaModality');
const sysCommunity = require('../models/sysCommunity');
const sysMatriculaObservation= require('../models/sysMatriculaObservation')



module.exports = {
    async index(request, response) {
        const connection = await dbSchool.getConnection();
        try {

            const matriculas = await sysMatricula.get({},connection);
            return response.status(201).json({
                success: true,
                message: 'Listado de matriculas.',
                data: matriculas
            })
            
        } catch (error) {
            console.log(error);
            return response.status(201).json({
                success: false,
                message: error,
            })
        }finally{
            // Cierra la conexión después de realizar las operaciones
            console.log('closed conection....')
            await dbSchool.closeConnection();
        }

        
    },
    async create(request, response) {
        const obj = request.body;
        const connection = await dbSchool.getConnection();
        try {
            // get the user who upload file by jwt
            const user = request.user
            // copy obj to toLowerCase
            let student = {
                ...obj,
                name: obj.name.toLowerCase(),
                lastname: obj.lastname.toLowerCase(),
                mother_lastname: obj.mother_lastname.toLowerCase(),
                birthdate: changeDateFormat(obj.date_birth),
                direccion: obj.direccion.toLowerCase(),
                phone: obj.phone,
                phone_aux: obj.phone_aux,
                email: obj.email.toLowerCase(),
                country_birth: '',
                nationality: '',
                observaciones: '',
                codigo_postal: null,
                department_number: 'No especificado',
                address: obj.direccion.toLowerCase(),
                cod_modality: '0001'
            };

            // get computed values db
            const course = await courses.getCoursesByCodeGradeAndCourseName(
                { 
                letter_course: student.letter_course, 
                code_grade: student.cod_grade,
                cod_type_teacher:student.cod_type_teacher 
                },
                connection
            );
            // add school period
            const sysSchool = await sysSchoolPeriod.getSchoolPeriodsByparams({id:student.sys_school_id},connection);
            // add matricula modality
            const matriculaModal = await sysMatriculaModality.getMatriculaModalityByparams({id:student.cod_modality_id},connection);
            // add sys_comunity
            const sys_comunity = await sysCommunity.getCommunityByparams({id:student.sys_comunity_id},connection);

            student = { ...student, course, sysSchool, matriculaModal, sys_comunity };
            

            // validate students data rules
            const studentsValidate = validateData(student,'create');

            // check if any error
            if (studentsValidate) {
                // save userPersonalInfo
                await connection.transaction(async (transaction) => {
                    try {
                        const userPersonalInfoId = await userPersonalInfo.create(student, transaction);
                        student.user_personal_info_id = userPersonalInfoId;
                        await transaction.commit();
                    } catch (error) {
                        console.log('Error in userPersonalInfo save: ' + error.message)
                    }
                });

                // save address information
                await connection.transaction(async (transaction) => {
                    try {

                        const addressesID = await userAddresses.create(student, student.sys_comunity.id, transaction)
                        await userAddressesPersonalInfo.create(
                            {
                                address_id: addressesID,
                                user_personal_info_id: student.user_personal_info_id
                            }, transaction)

                        await transaction.commit();

                    } catch (error) {
                        //console.log(error);
                        await transaction.rollback();
                        console.log('Error in adrres save: ' + error.message)
                    }
                })

                // save userCivilianInfo
                await connection.transaction(async (transaction) => {
                    try {

                        // search for students first in civilian
                        let ifstudentsCivilian = await userCivilianInfo.getBy({ user_personal_info_id: student.user_personal_info_id }, transaction)
                        console.log(ifstudentsCivilian)
                        if (ifstudentsCivilian === undefined) {
                            let userCivilianInfoID = await userCivilianInfo.create(student, student.user_personal_info_id, transaction);
                            console.log('userCivilianInfo ID: ' + userCivilianInfoID);
                        }
                        await transaction.commit();

                    } catch (error) {
                        await transaction.rollback();
                        console.log('Error in civilian save: ' + error.message)
                    }
                })

                // save userSocialInfo
                await connection.transaction(async (transaction) => {
                    try {
                        // search for students first in civilian
                        let ifstudentsCivilian = await userSocialInfo.getByUserPersonalinfoId(student.user_personal_info_id, transaction)
                        console.log(ifstudentsCivilian)
                        if (ifstudentsCivilian === undefined) {
                            let userSocialInfoID = await userSocialInfo.create(student, student.user_personal_info_id, transaction);
                            console.log('userSocialInfo ID: ' + userSocialInfoID);
                        }
                        await transaction.commit();

                    } catch (error) {
                        await transaction.rollback();
                        console.log('Error in civilian save: ' + error.message)
                    }
                })

                // save matricula
                await connection.transaction(async (transaction) => {
                    try {

                        // search by cod_matricula
                        let sys_courses_id = student.course[0].curso_id;
                        let cod_matricula = `${student.document_number}_${sys_courses_id}_${student.sysSchool.año_escolar}`;

                        let ifMatriculaExits = await sysMatricula.get({ cod_matricula: cod_matricula },transaction);
                        console.log("------------------->")
                        console.log(ifMatriculaExits);
                        if (!ifMatriculaExits.length) {
                            // add date create_at update_at
                            let create_date = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS');
                            let date_matricula = moment().format('YYYY-MM-DD');
                            let create_by = user.id;

                            const matricula = {
                                "cod_matricula": cod_matricula,
                                "date_matricula": date_matricula,
                                "create_at": create_date,
                                "create_by": create_by,
                                "user_personal_info_id": student.user_personal_info_id,
                                "sys_courses_id": sys_courses_id,
                                "sys_school_period_id": student.sysSchool.id,
                                "sys_matricula_modality_id": student.matriculaModal.id
                            }

                            const matriculaID = await sysMatricula.create(matricula, transaction);
                            student.sys_matricula_id = matriculaID;
                        } else {
                            student.sys_matricula_id = ifMatriculaExits.id;
                        }
                        await transaction.commit();

                    } catch (error) {
                        await transaction.rollback();
                        console.log('Error in matricula save: ' + error.message)
                    }
                })

                // save matricula observation
                await connection.transaction(async (transaction) => {
                    try {
        
                        if (student.sys_matricula_id) {
                            // search observation by code_checker -> file name upload
                            let ifObservable = await sysMatriculaObservation.get({name: student.observation.name,sys_matriculas_id:student.sys_matricula_id},transaction)
                            if (ifObservable == undefined) {
                                const matriculaObservation = {
                                "type_observation": student.observation.type,
                                "date_observation": moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                                "description": student.observation.description,
                                "name": student.observation.name,
                                "sys_matriculas_id": student.sys_matricula_id
                                }
                                await sysMatriculaObservation.create(matriculaObservation,transaction);
                                
                            }
                        }
                    
                    } catch (error) {
                        await transaction.rollback();
                        console.log('Error in matricula observation ',error)
                    }
                });

            }

            return response.status(201).json({
                success: true,
                message: 'Matricula registrada con exito',
                data: student,
                studentsValidate
            })

        } catch (error) {
            return response.status(201).json({
                success: false,
                message: error,
            })
        } finally {
            // Cierra la conexión después de realizar las operaciones
            console.log('closed conection....')
            await dbSchool.closeConnection();
        }

    },
    async update(request, response) {
        return response.status(201).json({
            success: true,
            message: 'Matricula actualizada con exito',
            //data: data
        })
    },
    async delete(request, response) {
        const id = request.params.id;
        const connection = await dbSchool.getConnection();

        try {
            const matriculas = await sysMatricula.get({id: id},connection);
            console.log(matriculas.length)
            if (matriculas.length > 0) {
                await sysMatricula.update(id,{'deleted_at': new Date()},connection)
                
            }



            return response.status(201).json({
                success: true,
                message: 'Matricula eliminada con exito',
                //data: matriculas
            })
            
        } catch ({ name, message }) {
            console.log(name); // "TypeError"
            console.log(message); 

            return response.status(201).json({
                success: false,
                message: message,
            })
            
        }finally {
            // Cierra la conexión después de realizar las operaciones
            console.log('closed conection....')
            await dbSchool.closeConnection();

        }
        
    }
}

function changeDateFormat(date_string) {
    // Check if the date_string contains slashes (/)
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date_string)) {
        // Reemplazar las barras con guiones
        return date_string.replace(/\//g, '-');
    }
    // If the format is different, return the same date_string
    return date_string;
}