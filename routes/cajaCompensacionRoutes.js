const cajaCompensacionController = require("../controllers/cajaCompensacionController");
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    // 401 UNAUTHORIZED
    app.get('/api/cajacompensacion', passport.authenticate('jwt', {session: false}), cajaCompensacionController.index);
    app.post('/api/cajacompensacion/create', passport.authenticate('jwt', {session: false}), cajaCompensacionController.create);
    app.put('/api/cajacompensacion/update', passport.authenticate('jwt', {session: false}), cajaCompensacionController.update);
    app.delete('/api/cajacompensacion/delete', passport.authenticate('jwt', {session: false}), cajaCompensacionController.softDelete);
}