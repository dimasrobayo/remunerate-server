require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const sessionConfig = require('./utils/sessionConfig');
require('./config/passport')(passport);

// Importar las rutas centralizadas
const initializeRoutes = require('./routes');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

/**
* MIDDLEWARE IDENTIFY TENANT
*/
const {getTenantDatabaseConnection} = require('./middleware/tenantDbMiddleware');
app.use(getTenantDatabaseConnection);

/**
*  Use cors middleware with the desired options
*/
app.use(cors({
    origin: 'https://localhost:3000', // Replace with your actual frontend URL
    credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
* Configurar express-session
*/
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.disable('x-powered-by');
app.set('port', PORT);

const upload = multer({
    storage: multer.memoryStorage()
})

/*
* Inicializar las rutas
*/
initializeRoutes(app, upload);

app.get('/', (request, response) => {
    response.send('Ruta raiz del backend');
});

/**
* INIT SERVER
*/
server.listen(PORT, HOST || 'localhost', function(){
    console.log('/////////////////////////////////////////////////////////////////////');
    console.log('//SERVIDOR ORDER NOW EN LINEA en '+ HOST + ':'+ PORT + ' Iniciada...//');
    console.log('/////////////////////////////////////////////////////////////////////');
});