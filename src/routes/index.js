const {Router} = require("express");
const usersRoutes = require('./users.routes')
const mealsRoutes = require('./meals.routes');
const authenticateToken = require("../middleware/authenticateToken");

const routes = Router();

 routes.use("/api/v1/users", usersRoutes);

 routes.use("/api/v1/meals",authenticateToken, mealsRoutes);

module.exports = routes;