import {Router} from "express";

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/create-user', usersController.create);

module.exports = usersRoutes
