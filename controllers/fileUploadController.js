
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { parse } = require("csv-parse")
const validate = require('validate.js');
const _ = require('lodash');

const dbSchool = require('../db');
const sysFile = require('../models/sysFile');
const userPersonalInfo = require('../models/userPersonalInfo');
const userCivilianInfo = require('../models/userCivilianInfo');
const sysTeachers = require('../models/sysTeachers');

const canonicalNamesFields = {
  'Numero Documento' : 'document_number',
  'Digito Verificador' : 'document_number_dv',
  'Nombre' : 'name',
  'Apellido Paterno' : 'lastname',
  'Apellido Materno' : 'mother_lastname',
  'Genero' : 'gender',
  'Fecha de Nacimiento' : 'birthdate',
  'RBD' : 'RBD'
};

const constraints = {
  document_number: { // Numero Documento
    presence: {
      allowEmpty: false,
      message: 'The Numero Documento field is required.'
    }
  },
  document_number_dv: { // Digito Verificador
    presence: {
      allowEmpty: false,
      message: 'The DV field is required.'
    }
  },
  name: {
    presence: { allowEmpty: false,
       message: 'The name field is required.' }
  },
  lastname: {
    presence: { allowEmpty: false,
       message: 'The lastname field is required.' }
  },
  mother_lastname: {
    presence: { allowEmpty: false,
       message: 'The mother lastname field is required.' }
  },
  gender: {
    presence: { allowEmpty: false,
       message: 'The gender field is required.' }
  },
  birthdate: {
    presence: { allowEmpty: false,
       message: 'The DOC_FEC_NAC field is required.' }
  },
  RBD: {
    presence: { allowEmpty: false,
       message: 'The RBD field is required.' }
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
              "moduleName": 'teacher',
              "upload_by": user.id
            };
            let sysFileRecordID = await sysFile.create(fileData);
            if (sysFileRecordID != null) {
              csv_data['file_id'] = sysFileRecordID;
              csv_data['columns'] = Object.keys(canonicalNamesFields)
            }
            // obtenemos los 3 registros
            const fileContent = await fs.promises.readFile(`${folderPathAsync}/${filename}`, 'utf8');
            // Divide las líneas del archivo
            const lines = fileContent.split('\n');
            // Utiliza map para aplicar str_getcsv a cada línea
            const data = lines.map((line) => line.split(','))
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
        console.log(keyMapping);
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
          document_number: `${obj.document_number}-${obj.document_number_dv}`,
          type_document: 'run',
          phone: '',
          country_birth: '',
          nationality: '',
          observaciones: '',

        }));
        // validate teacher data rules
        const teachers = validateTeachers(modelData);
        await connection.transaction(async (transaction) => {
          try {
            for (const teacher of teachers.dataValidate) {
              const userPersonalInfoId = await userPersonalInfo.create(teacher, transaction);
              if (userPersonalInfoId) {
                await userCivilianInfo.create(teacher, userPersonalInfoId, transaction);
                await sysTeachers.create(userPersonalInfoId, transaction);
              }
            }
            // Confirmar la transacción al final del bucle sin usar "await"
            await transaction.commit();
          } catch (error) {
            // Manejar el error y realizar un rollback en caso de problemas
            await transaction.rollback();
            console.error('Error during transaction:', error);
            // Puedes decidir lanzar o manejar el error según tus necesidades
          }
        });

        return response.status(201).json({
          success: true,
          message: 'Datos importados con exito!',
          errors: teachers.errors
        })
      } catch (error) {
        
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
    async update(request, response) {
      const id = request.params.id;
      console.log(id);
        
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

function validateTeachers(modelData) {
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

    const fileContent = await fs.readFileSync(path,'utf-8');


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
