
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { parse } = require("csv-parse")
const validate = require('validate.js');
const _ = require('lodash');


const sysFile = require('../models/sysFile');

const nameFieldsForMigrateTeacher = {
  'Numero Documento' : 'document_number',
  'Digito Verificador' : '',
  'Nombre' : 'name',
  'Apellido Paterno' : 'lastname',
  'Apellido Materno' : 'mother_lastname',
  'Genero' : 'gender',
  'Fecha de Nacimiento' : '',
  'RBD' : ''
};

const canonicalNamesFields = {
  'Numero Documento' : 'DOC_RUN',
  'Digito Verificador' : 'DOC_DV',
  'Nombre' : 'DOC_NOMBRE',
  'Apellido Paterno' : 'DOC_PATERNO',
  'Apellido Materno' : 'DOC_MATERNO',
  'Genero' : 'DOC_GENERO',
  'Fecha de Nacimiento' : 'DOC_FEC_NAC',
  'RBD' : 'DOC_RBD'
};



const constraints = {
  DOC_RUN: { // Numero Documento
    presence: {
      allowEmpty: true,
      message: 'The Numero Documento field is required.'
    }
  },
  DOC_DV: { // Digito Verificador
    presence: {
      allowEmpty: true,
      message: 'The DV field is required.'
    }
  },
  DOC_NOMBRE: {
    presence: {allowEmpty: false, message: 'The name field is required.' }
  },
  DOC_PATERNO: {
    presence: { message: 'The lastname field is required.' }
  },
  DOC_MATERNO: {
    presence: { message: 'The mother lastname field is required.' }
  },
  DOC_GENERO: {
    presence: { message: 'The gender field is required.' }
  },
  DOC_FEC_NAC: {
    presence: { message: 'The DOC_FEC_NAC field is required.' }
  },
  DOC_RBD: {
    presence: { message: 'The RBD field is required.' }
  },
  
  // Agrega más restricciones según tus necesidades
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
            createFolderIfNotExists(folderPathAsync)
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
              csv_data['columns'] = Object.keys(nameFieldsForMigrateTeacher)
            }
            // obtenemos los 3 registros
            const fileContent = await fs.promises.readFile(`${folderPathAsync}/${filename}`, 'utf8');

            // Divide las líneas del archivo
            const lines = fileContent.split('\n');

            // Utiliza map para aplicar str_getcsv a cada línea
            const data = lines.map((line) => line.split(','))

            // Extraer las primeras 3 filas
            const firstThreeRows = data.slice(0, 3);
            
            csv_data['csv_data'] = firstThreeRows;
            // get the column names for the table

            return response.status(201).json({
                success: true,
                message: 'Upload path.',
                data: csv_data 
            })
            
        } catch (error) {
            return response.status(201).json({
              success: false,
              message: error,
            })
        }
    },
    async migrate(request, response) {
      const id = request.params.id;
      
      try {
        // get record sysfile
        let sysFileRecord = await sysFile.getSysFilesById(id);
        const keyMapping = request.body;
        
        if(Object.keys(keyMapping).length > Object.keys(nameFieldsForMigrateTeacher).length){
          return response.status(401).json({
            success: false,
            message: 'supera el numeros de campos',
          })
        }
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
        console.log(documentPath);
        const data = await readFileCSV(documentPath);
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
        // create compute value for full rut
        const newData = _.map(results, (obj) => ({
          ...obj,
          DOC_FULL_RUN: `${obj.DOC_RUN}-${obj.DOC_DV}`
        }));
        
        console.log(newData);
        
        
        
        //const resultados = validarArrayDeObjetos(results);
        //console.log(resultados);



        return response.status(201).json({
          success: true,
          message: 'success',
        })
      } catch (error) {
        console.log(error);
        return response.status(201).json({
          success: false,
          message: error,
        })
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

    }
}

function createFolderIfNotExists(folderPath) {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error al crear la carpeta: ${err.message}`);
        return false;
      } else {
        console.log(`Carpeta creada en: ${folderPath}`);
        return true;
      }
    });
}

function validarArrayDeObjetos(dataArray) {
  const resultados = [];

  for (let i = 0; i < dataArray.length; i++) {
    const validationResult = validate(dataArray[i], constraints);
    console.log(dataArray[i]);
    if (validationResult !== undefined) {
      const errores = validationResult[Object.keys(validationResult)[0]];
      resultados.push({
        indexRowError: i + 1,
        errors: errores
      });
    }
  }

  return resultados;
}


async function readFileCSV(path,withHeader = false) {
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
