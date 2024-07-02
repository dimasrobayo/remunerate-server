const utilsRoutes = require('./utilsRoutes');
const userRoutes = require('./useRoutes');
const companiesRoutes = require('./companiesRoutes');
const mutualRoutes = require('./mutualRoutes');
const cajaCompensacionRoutes = require('./cajaCompensacionRoutes');

module.exports = (app, upload) => {
    utilsRoutes(app);
    userRoutes(app, upload);
    mutualRoutes(app);
    cajaCompensacionRoutes(app);
    companiesRoutes(app);
};