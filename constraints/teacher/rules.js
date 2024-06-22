
const validate = require('validate.js');

// Definir la validación personalizada
validate.validators.isArrayWithLength = function (value, options, key, attributes) {
    if (!Array.isArray(value)) {
        return "debe ser un array";
    }
    if (!value.length) {
        return "debe tener más de un elemento";
    }
    return null; // No hay errores
};

// Definir la validación personalizada
validate.validators.isObject = function (value, options, key, attributes) {
    // Si el valor no es un objeto, devolver un mensaje de error
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return options.message || `^${key} must be an object`;
    }
    // Si el valor es un objeto, devolver undefined (sin error)
    return undefined;
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
      presence: {
        allowEmpty: false,
        message: 'The name field is required.'
      }
    },
    lastname: {
      presence: {
        allowEmpty: false,
        message: 'The lastname field is required.'
      }
    },
    mother_lastname: {
      presence: {
        allowEmpty: false,
        message: 'The mother lastname field is required.'
      }
    },
    gender: {
      presence: {
        allowEmpty: false,
        message: 'The gender field is required.'
      }
    },
    birthdate: {
      presence: {
        allowEmpty: false,
        message: 'The DOC_FEC_NAC field is required.'
      }
    },
    RBD: {
      presence: {
        allowEmpty: false,
        message: 'The RBD field is required.'
      }
    },
};


const validateData = function(data) {
    // if is array of Objects
    const errors = [];
    const dataValidate = [];

    for (let i = 0; i < data.length; i++) {
        const validationResult = validate(data[i], constraints);
        if (validationResult !== undefined) {
            const errores = validationResult;
            errors.push({
                indexRowError: i + 2,
                errors: errores
            });
        } else {
            dataValidate.push(data[i]);
        }

    }

    return { errors, dataValidate };
}



module.exports = validateData;