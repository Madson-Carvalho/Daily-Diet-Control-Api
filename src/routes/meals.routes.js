const Router = require("express");

const MealsController = require("../controllers/MealsController")

const mealsRoutes = Router()

const mealsController = new MealsController()

mealsRoutes.post("/create-meal", mealsController.create);

mealsRoutes.put("/edit-meal/:id", mealsController.update);

mealsRoutes.delete("/remove-meal/:id", mealsController.delete);

mealsRoutes.get("/find-meals/:userId", mealsController.findAll);

mealsRoutes.get("/find-meal/:id",mealsController.findByName);

mealsRoutes.get("/count-meals/:userId", mealsController.countAllMeals);

mealsRoutes.get("/count-diet-meals/:userId", mealsController.countAllMealsInDiet);

mealsRoutes.get("/count-no-diet-meals/:userId", mealsController.countAllMealsOutDiet);

mealsRoutes.get("/find-longest-diet-meals-sequence/:userId", mealsController.getLongerMealSequence);

module.exports = mealsRoutes
