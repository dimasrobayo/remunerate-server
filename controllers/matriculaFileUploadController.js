
const fs = require('fs');
const path = require('path');
const { parse } = require("csv-parse")
const validate = require('validate.js');
const _ = require('lodash');
const moment = require('moment');

const dbSchool = require('../db');
const sysFile = require('../models/sysFile');
const sysMatricula = require('../models/sysMatricula');
const userPersonalInfo = require('../models/userPersonalInfo');
const userCivilianInfo = require('../models/userCivilianInfo');
const userSocialInfo = require('../models/userSocialInformation');
const courses = require('../models/courses');
const sysSchoolPeriod = require('../models/sysSchoolPeriod');
const sysMatriculaModality = require('../models/sysMatriculaModality');
const sysCommunity = require('../models/sysCommunity');
const userAddresses = require('../models/userAddresses');
const userAddressesPersonalInfo= require('../models/userAddressesPersonalInfo')
const sysMatriculaObservation= require('../models/sysMatriculaObservation')


const canonicalNamesFields = {
  'Año' : 'año_escolar', //check sys_school_period
  'RBD' : 'rbd', // todo
  'Cod Tipo Enseñanza' : 'cod_type_teacher',// todo
  'Cod Grado' : 'cod_grade',//check sys_grade
  'Desc Grado' : 'desc_grade',//check sys_grade
  'Letra Curso' : 'letter_course', // check sys_course
  'Run' : 'document_number', // user_personal_info
  'Dígito Ver.' : 'digit_see', // user_personal_info
  'Genero' : 'gender', // user_personal_info
  'Nombres' : 'name', // user_personal_info
  'Apellido Paterno' : 'lastname', // user_personal_info
  'Apellido Materno' : 'mother_lastname', // user_personal_info
  'Dirección' : 'direccion', // user_addresses
  'Comuna Residencia' : 'comunity_residence', // todo
  'Código Comuna Residencia' : 'idComuna', // todo
  'Email' : 'email', //  user_social_information
  'Teléfono' : 'phone', // user_personal_info 
  'Celular' : 'phone_aux', // user_social_information --> phone
  'Fecha Nacimiento' : 'date_birth', // user_civilian_information
  'Código Etnia' : 'etnia_code', // todo
  'Fecha Incorporación Curso' : 'created_at',
  'Fecha Retiro' : 'delete_at',
  '%Asistenca' : 'asistence_percent',
  'Promedio Final' : 'final_scrore',
        
};

// Definir la validación personalizada
validate.validators.isArrayWithLength = function(value, options, key, attributes) {
  if (!Array.isArray(value)) {
    return "debe ser un array";
  }
  if (!value.length) {
    return "debe tener más de un elemento";
  }
  return null; // No hay errores
};

// Definir la validación personalizada
validate.validators.isObject = function(value, options, key, attributes) {
  // Si el valor no es un objeto, devolver un mensaje de error
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return options.message || `^${key} must be an object`;
  }
  // Si el valor es un objeto, devolver undefined (sin error)
  return undefined;
};

const constraints = {
  año_escolar: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  rbd: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  cod_type_teacher: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  cod_grade: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  desc_grade: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  letter_course: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  document_number: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  digit_see: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  gender: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  name: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  lastname: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  mother_lastname: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  direccion: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  comunity_residence: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  idComuna: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  email: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  phone_aux: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  date_birth: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  etnia_code: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  created_at: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  delete_at: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  asistence_percent: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  final_scrore: {
    presence: {
      allowEmpty: false,
      message: 'The  field is required.'
    }
  },
  // values computed by db
  course: {
    presence: true,
    isArrayWithLength: true
  },
  sysSchool: {
    presence: true,
    isObject: true
  },
  matriculaModal: {
    presence: true,
    isObject: true
  },
};


module.exports = {
    async upload(request, response) {
        try {
            // objecto a retornar
            let csv_data = {};
            // validar que es un archivo csv
            const file = request.file;
            if (!file || !request.file.mimetype.includes('csv')) {
                // if not pass validator or file fields no have file
                return response.status(400).json({ error: 'Por favor, envía un archivo CSV.' });
            }
            // get the user who upload file by jwt
            const user = request.user
            // Get filename and extention
            const originalFilename = file.originalname;
            // Obtener la extensión del nombre de archivo
            const fileExtension = originalFilename.split('.').pop();
            // Filename to store with tenant
            const tenant = request.dbInfo.dbSchool_name;
            // store your file into directory and db sys file
            const timestamp = Date.now();
            let filename = `${timestamp}_${user.id}.${fileExtension}`;
            // Obtén el directorio superior (un nivel arriba)
            const parentDirectory = path.join(__dirname, '../../');
            // fullpath store file
            const folderPathAsync = path.join(parentDirectory, `uploads/${tenant}/tmp/`, `${user.id}`);
            await createFolderIfNotExists(folderPathAsync)
            // Guardar el archivo en el sistema de archivos
            fs.writeFileSync(`${folderPathAsync}/${filename}`, request.file.buffer);
            // save sys file
            let fileData = {
              "name": filename,
              "path":  folderPathAsync,
              "moduleName": 'matricula',
              "upload_by": user.id
            };
            let sysFileRecordID = await sysFile.create(fileData);
            if (sysFileRecordID != null) {
              csv_data['file_id'] = sysFileRecordID;
              csv_data['name'] = filename;
              csv_data['columns'] = '';
              
            }
            // obtenemos los 3 registros
            const fileContent = await fs.promises.readFile(`${folderPathAsync}/${filename}`, 'latin1');
            // Divide las líneas del archivo
            const lines = fileContent.split('\n');
            // Utiliza map para aplicar str_getcsv a cada línea
            const data = lines.map((line) => line.split(/[;,]/))
            // Extraer las primeras 3 filas
            const firstThreeRows = data.slice(0, 3);
            // get the column names for the table
            csv_data['csv_data'] = firstThreeRows;
            
            return response.status(201).json({
                success: true,
                message: 'Archivo cargado con exito!',
                data: csv_data 
            })
            
        } catch (error) {
          console.log("error: ", error);
            return response.status(201).json({
              success: false,
              message: error,
            })
        }
    },
    async migrate(request, response) {
      const id = request.params.id;
      const connection = await dbSchool.getConnection();
      
      try {
        // get record sysfile
        let sysFileRecord = await sysFile.getSysFilesById(id);
        const keyMapping = request.body;
        // get the user who upload file by jwt
        const user = request.user
        // get current tenant
        const tenant = request.dbInfo.dbSchool_name;
        // Obtén el directorio superior (un nivel arriba)
        const parentDirectory = path.join(__dirname, '../../');
        // fullpath store file
        const folderPathAsync = path.join(parentDirectory, `uploads/${tenant}/tmp/`, `${user.id}`);
        //compose path
        const documentPath = path.join(folderPathAsync,`/${sysFileRecord.name}`);
        // get isHeader value
        const {isHeader} = keyMapping;
        // delete isHeader key from keyMapping
        delete keyMapping.isHeader;
        // read file
        const data = await readFileCSV(documentPath,isHeader);
        // mapings values with key in the request
        const results = data.map((item) => {
          const obj = {};
          item.forEach((value, index) => {
            const key = keyMapping[index];
            const canonicalKey = canonicalNamesFields[key]
            obj[canonicalKey] = value;
          });
          return obj;
        });

        // create compute value 
        const modelData = _.map(results, (obj) => ({
          ...obj,
          name: obj.name.toLowerCase(),
          lastname: obj.name.toLowerCase(),
          mother_lastname: obj.name.toLowerCase(),
          document_number: `${obj.document_number}-${obj.digit_see}`,
          birthdate: changeDateFormat(obj.date_birth),
          comunity_residence: obj.comunity_residence.toLowerCase(),
          direccion: obj.direccion.toLowerCase(),
          type_document: 'run', // user_personal_info
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
        }));
        
        // add student course - period - modality
        const updatedStudents = await Promise.all(_.map(modelData, async (student) => {
          // add course
          const course = await courses.getCoursesByCodeGradeAndCourseName(
              { 
                letter_course: student.letter_course, 
                code_grade: student.cod_grade,
                cod_type_teacher:student.cod_type_teacher 
              },
              connection
          );
          // add school period
          const sysSchool = await sysSchoolPeriod.getSchoolPeriodsByparams({año_escolar:student.año_escolar},connection);
          // add matricula modality
          const matriculaModal = await sysMatriculaModality.getMatriculaModalityByparams({cod_modality:student.cod_modality},connection);
          // add sys_comunity
          const sys_comunity = await sysCommunity.getCommunityByparams({comuna:student.comunity_residence},connection);

          return { ...student, course, sysSchool, matriculaModal, sys_comunity };
        }));

        // validate students data rules
        const studentsValidate = validateStudents(updatedStudents);
        //console.log(JSON.stringify(updatedStudents,null,4));

        // save userPersonalInfo
        await connection.transaction(async (transaction) => {
          try {
            for (const student of studentsValidate.dataValidate) {
              const userPersonalInfoId = await userPersonalInfo.create(student, transaction);
              student.user_personal_info_id = userPersonalInfoId;

            }
            await transaction.commit();
          } catch (error) {
            await transaction.rollback();
            console.log('Error in userPersonalInfo save: ' + error.message)
          }
        });

        // save address information
        await connection.transaction(async (transaction) => {
          try {

            for (const student of studentsValidate.dataValidate) {
              const addressesID = await userAddresses.create(student,student.sys_comunity.id,transaction)
              await userAddressesPersonalInfo.create({address_id: addressesID,user_personal_info_id:student.user_personal_info_id},transaction)
            }
            await transaction.commit();
            
          } catch (error) {
            await transaction.rollback();
            //console.log(error);
            //console.log('Error in adrres save: ' + error.message)
          }
        })

        // save userCivilianInfo
        await connection.transaction(async (transaction) => {
          try {

            for (const student of studentsValidate.dataValidate) {
              // search for students first in civilian
              let ifstudentsCivilian = await userCivilianInfo.getBy({user_personal_info_id:student.user_personal_info_id},transaction)
              //console.log(ifstudentsCivilian)
              if (ifstudentsCivilian === undefined) {
                let userCivilianInfoID = await userCivilianInfo.create(student, student.user_personal_info_id, transaction);
                console.log('userCivilianInfo ID: ' + userCivilianInfoID);
              }
              
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

            for (const student of studentsValidate.dataValidate) {
              // search for students first in civilian
              let ifstudentsCivilian = await userSocialInfo.getByUserPersonalinfoId(student.user_personal_info_id,transaction)
              //console.log(ifstudentsCivilian)
              if (ifstudentsCivilian === undefined) {
                let userSocialInfoID = await userSocialInfo.create(student,student.user_personal_info_id,transaction);
                //console.log('userSocialInfo ID: ' + userSocialInfoID);
              }
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

            for (const student of studentsValidate.dataValidate) {
              // search by cod_matricula
              let sys_courses_id = student.course[0].curso_id;
              let cod_matricula = `${student.document_number}_${sys_courses_id}_${student.año_escolar}`;
              
              let ifMatriculaExits = await sysMatricula.get({cod_matricula:cod_matricula},connection);
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

                const matriculaID = await sysMatricula.create(matricula,transaction);
                student.sys_matricula_id = matriculaID;
              }else{
                student.sys_matricula_id = ifMatriculaExits.id;
              }
              
              
            }
            await transaction.commit();
            
          } catch (error) {
            await transaction.rollback();
            console.log('Error in civilian save: ' + error.message)
          }
        })

        // save matricula observation
        await connection.transaction(async (transaction) => {
          try {

            for (const student of studentsValidate.dataValidate) {
              if (student.sys_matricula_id) {
                // search observation by code_checker -> file name upload
                let ifObservable = await sysMatriculaObservation.get({name: sysFileRecord.name,sys_matriculas_id:student.sys_matricula_id},transaction)
                if (ifObservable == undefined) {
                  const matriculaObservation = {
                    "type_observation": 'migrate',
                    "date_observation": moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                    "description": `Matricula importada Nomina SIGUE`,
                    "name": sysFileRecord.name,
                    "sys_matriculas_id": student.sys_matricula_id
                  }
                  await sysMatriculaObservation.create(matriculaObservation,transaction);
                  
                }
              }
            }
            
          } catch (error) {
            await transaction.rollback();
            console.log('Error in matricula observation ',error)
          }
        });

        return response.status(201).json({
          success: true,
          message: 'Datos importados con exito!',
          //updatedStudents: updatedStudents,
          errors: studentsValidate.errors,
          documentPath: documentPath,
          dataValidate: studentsValidate.dataValidate
        })
      } catch (error) {
        console.log(error);
        return response.status(201).json({
          success: false,
          message: error,
        })
      }finally {
        // Cierra la conexión después de realizar las operaciones
        console.log('closed conection....')
        await dbSchool.closeConnection();
      }

      
      
        
    },
    async delete(request, response) {
        const id = request.params.id;
        console.log(id);
        try {
          // get record sysfile
          let sysFileRecord = await sysFile.getSysFilesById(id);
          if (typeof sysFileRecord != 'undefined') {
            // compose file path
            let filePath = `${sysFileRecord.path}/${sysFileRecord.name}`;
            // delete file
            if (fs.existsSync(filePath)) {
              await fs.unlinkSync(filePath);
            }
            // softDeletes
            await sysFile.update(id);
            
          }
          return response.status(201).json({
            success: true,
            message: id,
          })
        } catch (error) {
          console.log(error);
          return response.status(201).json({
            success: false,
            message: error,
          })
        }

    },
    
}

function createFolderIfNotExists(folderPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error al crear la carpeta: ${err.message}`);
        reject(false);
      } else {
        console.log(`Carpeta creada en: ${folderPath}`);
        resolve(true);
      }
    });
  });
}

function validateStudents(modelData) {
  const errors = [];
  const dataValidate = [];

  for (let i = 0; i < modelData.length; i++) {
    const validationResult = validate(modelData[i], constraints);
    if (validationResult !== undefined) {
      const errores = validationResult;
      errors.push({
        indexRowError: i + 2,
        errors: errores
      });
    }else{
      dataValidate.push(modelData[i]);
    }
    
  }

  return {errors,dataValidate};
}


async function readFileCSV(path,withHeader = true) {
  try {
    const results = [];
    const from_line = withHeader ? 2 : 1;

    const fileContent = await fs.readFileSync(path,'latin1');


    await new Promise((resolve, reject) => {
      const stream = require('stream');
      const readableStream = new stream.Readable();
      readableStream.push(fileContent);
      readableStream.push(null);

      readableStream
        .pipe(parse({ delimiter: ",", from_line: from_line }))
        .on('data', (row) => {
          results.push(row);
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    return results;
  } catch (error) {
    throw error;
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