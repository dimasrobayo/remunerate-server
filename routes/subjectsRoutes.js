const subjectsController = require("../controllers/subjectsController");
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/subjects', passport.authenticate('jwt', {session: false}), subjectsController.index);
    app.post('/api/subjects/create', passport.authenticate('jwt', {session: false}), subjectsController.create);
    app.put('/api/subjects/update', passport.authenticate('jwt', {session: false}), subjectsController.update);
    app.delete('/api/subjects/delete/:id', passport.authenticate('jwt', {session: false}), subjectsController.delete);
}