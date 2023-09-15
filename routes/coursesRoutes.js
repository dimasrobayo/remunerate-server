const coursesController = require("../controllers/coursesController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/courses', passport.authenticate('jwt', {session: false}), coursesController.index);
    app.post('/api/courses/create', passport.authenticate('jwt', {session: false}), coursesController.create);
    app.put('/api/courses/update', passport.authenticate('jwt', {session: false}), coursesController.update);
    app.delete('/api/courses/delete/:id', passport.authenticate('jwt', {session: false}), coursesController.delete);
}