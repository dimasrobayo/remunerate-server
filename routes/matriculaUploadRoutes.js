const matriculafileUploadController = require("../controllers/matriculaFileUploadController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    app.post('/api/matricula/migrate/upload',passport.authenticate('jwt', {session: false}), upload.single('file'), matriculafileUploadController.upload);
    app.post('/api/matricula/migrate/:id', passport.authenticate('jwt', {session: false}), matriculafileUploadController.migrate);
    app.delete('/api/matricula/destroy/:id',  matriculafileUploadController.delete);
}