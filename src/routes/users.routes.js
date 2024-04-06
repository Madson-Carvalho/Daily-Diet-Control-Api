const Router = require("express");

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/create-user', usersController.create);

usersRoutes.get('/login', usersController.login);

module.exports = usersRoutes
