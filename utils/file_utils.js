const fs = require('fs');
const { parse } = require("csv-parse")

async function readFileCSV(path, withHeader = true) {
    try {
        const results = [];
        const from_line = withHeader ? 2 : 1;

        const fileContent = await fs.readFileSync(path, 'utf-8');


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

module.exports = {
    readFileCSV,
    createFolderIfNotExists
}