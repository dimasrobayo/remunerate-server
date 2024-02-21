const teachersController = require("../controllers/teachersController");
const fileUploadController = require("../controllers/fileUploadController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/teachers', passport.authenticate('jwt', {session: false}), teachersController.index);
    app.post('/api/teachers/create', passport.authenticate('jwt', {session: false}), teachersController.create);
    app.get('/api/teachers/byDocumentNumber/:documetNumber', passport.authenticate('jwt', {session: false}), teachersController.teacherByDocumentNumber);
    app.post('/api/teachers/deleteTeacherCourse', passport.authenticate('jwt', {session: false}), teachersController.deleteTeacherCourse);
    app.get('/api/teachers/isBoss/:idCoursesTeacher', passport.authenticate('jwt', {session: false}), teachersController.isBoss);
    app.get('/api/teachers/isInspector/:idCoursesTeacher', passport.authenticate('jwt', {session: false}), teachersController.isInspector);
    app.delete('/api/teachers/delete/:id', passport.authenticate('jwt', {session: false}), teachersController.delete);
    
    // app.put('/api/teachers/update', passport.authenticate('jwt', {session: false}), teachersController.update);
    // app.delete('/api/teachers/delete/:id', passport.authenticate('jwt', {session: false}), teachersController.delete);

    // migrations
    //app.post('/api/teachers/upload', passport.authenticate('jwt', {session: false}),fileUploadController.upload);
    app.post('/api/teachers/migrate/upload',passport.authenticate('jwt', {session: false}), upload.single('file'), fileUploadController.upload);
    app.post('/api/teachers/migrate/:id', passport.authenticate('jwt', {session: false}), fileUploadController.migrate);
    app.delete('/api/teachers/destroy/:id',  fileUploadController.delete);
}