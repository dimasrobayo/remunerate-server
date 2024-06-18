// sessionConfig.js
require('dotenv').config();
const session = require('express-session');

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Se Cambia a true si usas HTTPS
});

module.exports = sessionConfig;