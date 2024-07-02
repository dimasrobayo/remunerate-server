const mutualController = require("../controllers/mutualController");
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    // 401 UNAUTHORIZED
    app.get('/api/mutual', passport.authenticate('jwt', {session: false}), mutualController.index);
    app.post('/api/mutual/create', passport.authenticate('jwt', {session: false}), mutualController.create);
    app.put('/api/mutual/update', passport.authenticate('jwt', {session: false}), mutualController.update);
    app.delete('/api/mutual/delete', passport.authenticate('jwt', {session: false}), mutualController.softDelete);
}