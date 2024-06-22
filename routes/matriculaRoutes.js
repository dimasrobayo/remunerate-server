const matriculafileUploadController = require("../controllers/matriculaFileUploadController");
const matriculaController = require("../controllers/matriculaController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    app.get('/api/matricula', passport.authenticate('jwt', {session: false}), matriculaController.index);
    // POST -> ALMACENAR DATOS
    app.post('/api/matricula/create', passport.authenticate('jwt', {session: false}), matriculaController.create);
    // PUT -> ACTUALIZAR DATOS
    app.put('/api/matricula/update/:id', passport.authenticate('jwt', {session: false}), matriculaController.update);
    // DELETE -> ELIMINAR DATOS
    app.delete('/api/matricula/delete/:id', passport.authenticate('jwt', {session: false}), matriculaController.delete_at)
    app.post('/api/matricula/migrate/upload',passport.authenticate('jwt', {session: false}), upload.single('file'), matriculafileUploadController.upload);
    app.post('/api/matricula/migrate/:id', passport.authenticate('jwt', {session: false}), matriculafileUploadController.migrate);
    app.delete('/api/matricula/destroy/:id',  matriculafileUploadController.delete);
}