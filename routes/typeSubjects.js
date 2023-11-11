const typeSubjectsController = require("../controllers/typeSubjectsController");
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/typeSubjects', passport.authenticate('jwt', {session: false}), typeSubjectsController.index);
}