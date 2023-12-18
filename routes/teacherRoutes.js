const teachersController = require("../controllers/teachersController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/teachers', passport.authenticate('jwt', {session: false}), teachersController.index);
    app.post('/api/teachers/create', passport.authenticate('jwt', {session: false}), teachersController.create);
    // app.put('/api/teachers/update', passport.authenticate('jwt', {session: false}), teachersController.update);
    // app.delete('/api/teachers/delete/:id', passport.authenticate('jwt', {session: false}), teachersController.delete);
}