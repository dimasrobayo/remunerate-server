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

/*
* IMPORT TO THE ROUTES
*/
const useRoutes = require('./routes/useRoutes');
const typeTeachingRoutes = require('./routes/typeTeachingRoutes');
const gradesRoutes = require('./routes/gradesRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const typeSubjectsRoutes = require('./routes/typeSubjects');
const subjectRoutes = require('./routes/subjectsRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const teachersRoutes = require('./routes/teacherRoutes');
const utilsRoutes = require('./routes/utilsRoutes');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

/*
* MIDDLEWARE IDENTIFY TENANT
*/
const tenantMiddleware = require('./middleware/tenantMiddleware');
app.use(tenantMiddleware);

// MIDDLEWARE CONECTION TO DATA BASE SCHOOL
const schoolMiddleware = require('./middleware/schoolMiddleware');
app.use(schoolMiddleware);

// Use cors middleware with the desired options
app.use(cors({
    origin: 'https://localhost:3000', // Replace with your actual frontend URL
    credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Configurar express-session
app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());


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
coursesRoutes(app);
subjectRoutes(app);
typeSubjectsRoutes(app);
schoolRoutes(app);
teachersRoutes(app, upload);
utilsRoutes(app);

app.get('/', (request, response) => {
    response.send('Ruta raiz del backend');
});

// Init Server
server.listen(PORT, HOST || 'localhost', function(){
    console.log('/////////////////////////////////////////////////////////////////////');
    console.log('//SERVIDOR ORDER NOW EN LINEA en '+ HOST + ':'+ PORT + ' Iniciada...//');
    console.log('/////////////////////////////////////////////////////////////////////');
});
