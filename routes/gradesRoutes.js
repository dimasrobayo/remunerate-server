const gradesController = require("../controllers/gradesController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/grades', passport.authenticate('jwt', {session: false}), gradesController.index);
    app.post('/api/grades/create', passport.authenticate('jwt', {session: false}), gradesController.create);
    app.put('/api/grades/update', passport.authenticate('jwt', {session: false}), gradesController.update);
    app.delete('/api/grades/delete/:id', passport.authenticate('jwt', {session: false}), gradesController.delete);
}