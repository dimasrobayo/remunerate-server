const internalCategoriesController = require("../controllers/internalCategoriesController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // 401 UNAUTHORIZED
    app.get('/api/internalcategories', passport.authenticate('jwt', {session: false}), internalCategoriesController.getAllInternalCategories);
    app.get('/api/internalcategories/internalcategoriesbyid/:id', passport.authenticate('jwt', {session: false}), internalCategoriesController.getInternalCategoryById);
    app.post('/api/internalcategories/create', passport.authenticate('jwt', {session: false}), internalCategoriesController.createInternalCategory);
    app.put('/api/internalcategories/update/:id', passport.authenticate('jwt', {session: false}), internalCategoriesController.updateInternalCategory);
    app.delete('/api/internalcategories/delete/:id', passport.authenticate('jwt', {session: false}), internalCategoriesController.deleteInternalCategory);
}