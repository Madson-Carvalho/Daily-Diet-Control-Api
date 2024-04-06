const Router = require("express");

const MealsController = require("../controllers/MealsController")

const mealsRoutes = Router()

const mealsController = new MealsController()

mealsRoutes.post("/create-meal", mealsController.create);

mealsRoutes.put("/edit-meal", mealsController.update);

mealsRoutes.delete("/remove-meal", mealsController.delete);

mealsRoutes.get("/find-meals", mealsController.findAll);

mealsRoutes.get("/find-meal/:id",mealsController.findByName);

mealsRoutes.get("/count-meals", mealsController.countAllMeals);

mealsRoutes.get("/count-diet-meals", mealsController.countAllMealsInDiet);

mealsRoutes.get("/count-no-diet-meals", mealsController.countAllMealsOutDiet);

mealsRoutes.get("/find-longest-diet-meals-sequence", mealsController.getLongerMealSequence);

module.exports = mealsRoutes