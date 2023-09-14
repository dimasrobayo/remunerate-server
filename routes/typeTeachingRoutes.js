const typeTeachingController = require("../controllers/typeTeachingController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/typeTeaching', passport.authenticate('jwt', {session: false}), typeTeachingController.index);
    app.post('/api/typeTeaching/create', passport.authenticate('jwt', {session: false}), typeTeachingController.create);
    app.get('/api/typeTeaching/edit/:id', passport.authenticate('jwt', {session: false}), typeTeachingController.edit);
    app.put('/api/typeTeaching/update', passport.authenticate('jwt', {session: false}), typeTeachingController.update);
    app.delete('/api/typeTeaching/delete/:id', passport.authenticate('jwt', {session: false}), typeTeachingController.delete);
}