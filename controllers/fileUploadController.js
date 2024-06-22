
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');

const SysFile = require('../models/SysFile');
const UserPersonalInfo = require('../models/UserPersonalInfo');
const UserCivilianInfo = require('../models/UserCivilianInfo');
const Teacher = require('../models/Teacher');

const validateData = require('../constraints/teacher/rules');
const { createFolderIfNotExists, readFileCSV } = require('../utils/file_utils')


const canonicalNamesFields = {
  'Numero Documento': 'document_number',
  'Digito Verificador': 'document_number_dv',
  'Nombre': 'name',
  'Apellido Paterno': 'lastname',
  'Apellido Materno': 'mother_lastname',
  'Genero': 'gender',
  'Fecha de Nacimiento': 'birthdate',
  'RBD': 'RBD'
};

/**
 * Controller function to handle upload route.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const upload = async (request, response) => {
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
      "path": folderPathAsync,
      "moduleName": 'teacher',
      "upload_by": user.id
    };
    // save in sys_files
    let sysFileObj = await SysFile.create(fileData);

    csv_data['file_id'] = sysFileObj.id;
    csv_data['columns'] = Object.keys(canonicalNamesFields)

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
      data: csv_data,
      path: sysFileObj.path
    })

  } catch (error) {
    console.log("error: ", error);
    return response.status(201).json({
      success: false,
      message: error,
    })
  }

}

/**
 * Controller function to handle migrate route.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const migrate = async (request, response) => {
  try {
    const id = request.params.id;
    // get record sysfile
    let sysFileRecord = await SysFile.findById(id);
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
    const documentPath = path.join(folderPathAsync, `/${sysFileRecord.name}`);
    // get isHeader value
    const { isHeader } = keyMapping;
    // delete isHeader key from keyMapping
    delete keyMapping.isHeader;
    console.log(keyMapping);
    // read file
    const data = await readFileCSV(documentPath, isHeader);
    console.log(data);
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
      document_number: `${obj.document_number}-${obj.document_number_dv}`,
      birthdate: changeDateFormat(obj.birthdate),
      type_document: 'run',
      phone: '',
      country_birth: '',
      nationality: '',
      observaciones: '',

    }));
    // validate teacher data rules
    const teachers = validateData(modelData);
   


    try {
      await Teacher.transaction(async (trx) => {
        for (const teacher of teachers.dataValidate) {
          const {
            document_number,
            name,
            lastname,
            mother_lastname,
            type_document,
            gender,
            phone,
            country_birth,
            birthdate,
            nationality,
            observaciones
          } = teacher;

          let userPersonalObj = await UserPersonalInfo.findOneByCondition({ document_number });

          if (!userPersonalObj) {
            const personalInfo = {
              name,
              lastname,
              mother_lastname,
              type_document,
              document_number,
              gender,
              phone,
              image: null,
            };

            userPersonalObj = await UserPersonalInfo.query(trx).insert(personalInfo);
          }
          let ifstudentsCivilian = await UserCivilianInfo.findOneByCondition({
            user_personal_info_id: userPersonalObj.id
          })
          if (ifstudentsCivilian == undefined) {
            let civilian = {
              user_personal_info_id: userPersonalObj.id,
              birthdate,
              country_birth,
              nationality,
              observaciones
            }
            await UserCivilianInfo.query(trx).insert(civilian)
          }

          let teacherObj = await Teacher.findOneByCondition({
            user_personal_info_id: userPersonalObj.id
          })
          if (!teacherObj) {
            teacherObj = await Teacher.query(trx).insert({ user_personal_info_id: userPersonalObj.id });
          }
          console.log(teacherObj)

        }
      });


      // Here the transaction has been committed.
    } catch (error) {
      // Here the transaction has been rolled back.
      console.error(error);
      console.error('Error en la transacción: teacher', error.message);
    }



    return response.status(201).json({
      success: true,
      message: 'Datos importados con exito!',
      //teachers: teachersModels,
      errors: teachers.errors
    })
  } catch (error) {
    console.error(error);
    console.error('Error en la controller: fileuload', error.message);
    return response.status(201).json({
      success: false,
      message: error,
    })
  } finally {
    // Cierra la conexión después de realizar las operaciones
    console.log('closed conection....')

  }



}

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
    // get record sysfile
    let sysFileRecord = await SysFile.findById(id);
    if (typeof sysFileRecord != 'undefined') {
      // compose file path
      let filePath = `${sysFileRecord.path}/${sysFileRecord.name}`;
      // delete file
      if (fs.existsSync(filePath)) {
        await fs.unlinkSync(filePath);
      }
      // softDeletes
      const deleted_at = moment().format('YYYY-MM-DD HH:mm:ss');
      await SysFile.updateById(id,{deleted_at: deleted_at});

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


}


module.exports = {
  upload,
  migrate,
  delete_at
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