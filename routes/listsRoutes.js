const listsController = require("../controllers/listsController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // 401 UNAUTHORIZED
    app.get('/api/lists', passport.authenticate('jwt', {session: false}), listsController.getAllLists);
    app.get('/api/onlylists', passport.authenticate('jwt', {session: false}), listsController.getOnlyLists);
    app.get('/api/lists/listsbyid/:id', passport.authenticate('jwt', {session: false}), listsController.getListById);
    app.post('/api/lists/create', passport.authenticate('jwt', {session: false}), listsController.createList);
    app.put('/api/lists/update/:id', passport.authenticate('jwt', {session: false}), listsController.updateList);
    app.delete('/api/lists/delete/:id', passport.authenticate('jwt', {session: false}), listsController.deleteList);
}