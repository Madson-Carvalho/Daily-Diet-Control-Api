const {Router} = require("express");
const usersRoutes = require('./users.routes')

const routes = Router();

 routes.use('/api/v1/users', usersRoutes);

module.exports = routes;