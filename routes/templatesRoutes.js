const PayrollTemplateController = require("../controllers/PayrollTemplateController");
const passport = require('passport');

module.exports = (app) => {
    // Rutas para personal template
    app.get('/api/payrolltemplate', passport.authenticate('jwt', { session: false }), PayrollTemplateController.index);
    app.get('/api/payrolltemplate/show/:id', passport.authenticate('jwt', { session: false }), PayrollTemplateController.show);
    app.get('/api/payrolltemplate/conceptsbyuser/:userId/:conceptId', passport.authenticate('jwt', { session: false }), PayrollTemplateController.conceptsByUser);
    app.post('/api/payrolltemplate/create', passport.authenticate('jwt', { session: false }), PayrollTemplateController.create);
    app.put('/api/payrolltemplate/update/:id', passport.authenticate('jwt', { session: false }), PayrollTemplateController.update);
    app.delete('/api/payrolltemplate/delete/:id', passport.authenticate('jwt', { session: false }), PayrollTemplateController.destroy);
    
    // Rutas para payroll templates type
    app.get('/api/payrolltemplatestype', passport.authenticate('jwt', { session: false }), PayrollTemplateController.payrollTemplatesType);
}