const usersController = require("../controllers/usersController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.post('/api/users/login', usersController.login);
    app.post('/api/users/register', usersController.register);
    app.post('/api/users/registerWithImage', upload.array('image', 1), usersController.registerWithImage);
    
    // 401 UNAUTHORIZED
    app.get('/api/users/findByUsers', passport.authenticate('jwt', {session: false}), usersController.findByUsers);
    app.get('/api/users/findById/:id', passport.authenticate('jwt', {session: false}), usersController.findUsersById);
    app.put('/api/users/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 1), usersController.updateWithImage);
    app.put('/api/users/updateWithOutImage', passport.authenticate('jwt', {session: false}), usersController.updateWithoutImage);
}