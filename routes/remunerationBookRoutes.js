const remunerationBookController = require("../controllers/remunerationBookController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // 401 UNAUTHORIZED
    app.get('/api/remunerationbook', passport.authenticate('jwt', {session: false}), remunerationBookController.getAllRemunerationBook);
    app.get('/api/remunerationbook/listtypelre', passport.authenticate('jwt', {session: false}), remunerationBookController.getAllTypeLRE);
    app.get('/api/remunerationbook/listbynottype/:type', passport.authenticate('jwt', {session: false}), remunerationBookController.listbynottype);
    app.get('/api/remunerationbook/remunerationbookbyid/:id', passport.authenticate('jwt', {session: false}), remunerationBookController.getRemunerationBookById);
    app.post('/api/remunerationbook/create', passport.authenticate('jwt', {session: false}), remunerationBookController.createRemunerationBook);
    app.put('/api/remunerationbook/update/:id', passport.authenticate('jwt', {session: false}), remunerationBookController.updateRemunerationBook);
    app.delete('/api/remunerationbook/delete/:id', passport.authenticate('jwt', {session: false}), remunerationBookController.deleteRemunerationBook);
}