const schoolsController = require("../controllers/schoolsController");
const passport = require('passport');

module.exports = (app) => {
    // 401 UNAUTHORIZED
    app.post('/api/school/getAll', passport.authenticate('jwt', {session: false}), schoolsController.getAll);
}