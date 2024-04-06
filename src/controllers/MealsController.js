const prisma = require("../utils");

class MealsController {
    async create(request, response) {
        try {
            const requestBody = request.body;

            const meals = await prisma.meals.create({
                data: {
                    name: requestBody.name,
                    description: requestBody.description,
                    dateTime: requestBody.dateTime,
                    isInDiet: requestBody.isInDiet,
                    idUser: requestBody.idUser
                }
            })

            response.json(meals);
        } catch (e) {
            return response.status(409).send();
        }
    }

    async update(request, response) {
        try {
            const requestBody = request.body;
            const param = request.params;

            const result = await prisma.meals.update({
                where: {
                    id: param.id
                },
                data: {
                    name: requestBody.name,
                    description: requestBody.description,
                    dateTime: requestBody.dateTime,
                    isInDiet: requestBody.isInDiet
                }
            })

            response.json(result);
        } catch (e) {
            return response.status(409).send();
        }
    }

    async delete(request, response) {
        try {
            const param = request.params;

            const result = await prisma.meals.delete({
                where: {
                    id: param.id
                }
            })

            return response.status(200);
        } catch (e) {
            return response.status(409).send();
        }
    }

    async findByName(request, response) {
        try {
            const param = request.params;

            const meal = await prisma.meals.findUnique({
                where: {
                    id: param.id,
                },
                select: {
                    name: true,
                    description: true,
                    dateTime: true,
                    isInDiet: true,
                },
            })

            response.json(meal);
        } catch (e) {
            return response.status(409).send();
        }
    }

    async findAll(request, response) {
        try {
            const meals = await prisma.meals.findMany()

            response.json(meals);
        } catch (e) {
            // return response.status(409).send();
        }
    }

    async countAllMeals(request, response) {
        try {
            const quantityMeals = await prisma.meals.count()

            return response.json(quantityMeals);
        } catch (e) {
            return response.status(409).send();
        }
    }

    async countAllMealsInDiet(request, response) {
        try {
            const quantityMealsInDiet = await prisma.meals.count({
                where: {
                    isInDiet: true
                }
            });

            return response.json(quantityMealsInDiet);
        } catch (e) {
            return response.status(409).send();
        }
    }

    async countAllMealsOutDiet(request, response) {
        try {
            const quantityMealsOutDiet = await prisma.meals.count({
                where: {
                    isInDiet: false
                }
            });

            return response.json(quantityMealsOutDiet);
        } catch (e) {
            return response.status(409).send();
        }
    }

    async getLongerMealSequence(request, response) {
        try {
            const longerMealSequence = await prisma.meals.count({
                where: {
                    isInDiet: true
                },
                groupyBy: {
                    dateTime
                }
            });

            return response.json(longerMealSequence);
        } catch (e) {
            return response.status(409).send();
        }
    }
}

module.exports = MealsController;