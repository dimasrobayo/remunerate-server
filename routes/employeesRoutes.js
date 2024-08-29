const EmployeesController = require("../controllers/EmployeesController");
const passport = require('passport');

module.exports = (app) => {
    // Rutas para employees
    app.get('/api/employees', passport.authenticate('jwt', { session: false }), EmployeesController.index);
    app.get('/api/employees/list', passport.authenticate('jwt', { session: false }), EmployeesController.list);
    app.get('/api/employees/:id', passport.authenticate('jwt', { session: false }), EmployeesController.getUserById);
    app.post('/api/employees/create', passport.authenticate('jwt', { session: false }), EmployeesController.create);
    app.put('/api/employees/update/:id', passport.authenticate('jwt', { session: false }), EmployeesController.update);
    app.delete('/api/employees/delete/:id', passport.authenticate('jwt', { session: false }), EmployeesController.softDelete);
};