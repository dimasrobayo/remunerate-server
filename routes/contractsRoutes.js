const ContractsController = require("../controllers/ContractsController");
const passport = require('passport');

module.exports = (app) => {
    // Rutas para contracts
    app.get('/api/contracts/:id', passport.authenticate('jwt', { session: false }), ContractsController.index);
    app.post('/api/contracts/create', passport.authenticate('jwt', { session: false }), ContractsController.create);
    app.put('/api/contracts/update/:id', passport.authenticate('jwt', { session: false }), ContractsController.update);
    app.delete('/api/contracts/delete/:id', passport.authenticate('jwt', { session: false }), ContractsController.softDelete);
};