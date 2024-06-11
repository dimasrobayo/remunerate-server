
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
    'upload': {
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
    },
    'create': {
        sys_school_id: {
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
        comunity_residence_id: {
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
    }
};


const validateData = function(data,type_rule = 'upload') {
    // if is a Object
    if (data === Object(data)) {
        const validationResult = validate(data, constraints[type_rule]);
        return validationResult == undefined ? true : validationResult;
    }
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