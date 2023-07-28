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
const schoolRoutes = require('./routes/schoolRoutes');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

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
schoolRoutes(app);

// Init Server
server.listen(PORT, HOST || 'localhost', function(){
    console.log('/////////////////////////////////////////////////////////////////////');
    console.log('//SERVIDOR ORDER NOW EN LINEA en '+ HOST + ':'+ PORT + ' Iniciada...//');
    console.log('/////////////////////////////////////////////////////////////////////');
});