require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');

/*
* MIDDLEWARE IDENTIFY TENANT
*/
const tenantMiddleware = require('./middleware/tenantMiddleware');
app.use(tenantMiddleware);

// MIDDLEWARE CONECTION TO DATA BASA SCHOOL
const schoolMiddleware = require('./middleware/schoolMiddleware');
app.use(schoolMiddleware);

/*
* IMPORT TO THE ROUTES
*/
const useRoutes = require('./routes/useRoutes');
const typeTeachingRoutes = require('./routes/typeTeachingRoutes');
const gradesRoutes = require('./routes/gradesRoutes');
const schoolRoutes = require('./routes/schoolRoutes');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Desactivar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir acceso desde cualquier origen
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');
app.set('port', PORT);

const upload = multer({
    storage: multer.memoryStorage()
})

/*
* CALL TO THE ROUTES
*/
useRoutes(app, upload);
typeTeachingRoutes(app);
gradesRoutes(app);
schoolRoutes(app);

app.get('/', (request, response) => {
    response.send('Ruta raiz del backend');
});

// Init Server
server.listen(PORT, HOST || 'localhost', function(){
    console.log('/////////////////////////////////////////////////////////////////////');
    console.log('//SERVIDOR ORDER NOW EN LINEA en '+ HOST + ':'+ PORT + ' Iniciada...//');
    console.log('/////////////////////////////////////////////////////////////////////');
});