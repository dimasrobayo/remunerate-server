const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./config/knexfile'); // Asegúrate de que el archivo knexfile.js esté configurado

// Inicializa Knex
const knex = Knex(knexConfig.development);

// Da acceso a objection para usar knex
Model.knex(knex);

module.exports = knex;