const { prisma } = require("../utils");

class MealsController {
    async create(request, response) {
        try {
            const requestBody = request.body;

            const meals = prisma.meals.create({
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
            return response.response.status(409).send();
        }
    }

    async update(request, response) {
        try {
            const requestBody = request.body;
            const param = request.params;

            const result = prisma.meals.update({
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
            return response.response.status(409).send();
        }
    }

    async delete(request, response) {
        try {
            const param = request.params;

            const result = prisma.meals.delete({
                where: {
                    id: param.id
                }
            })

            return response.status(200);
        } catch (e) {
            return response.response.status(409).send();
        }
    }

    async findByName(request, response) {
        try {
            const param = request.params;

            const meal = await prisma.meals.findUnique({
                where: {
                    name: param.name,
                },
                select: {
                    name: true,
                    description: true,
                    dateTime: true,
                    isInDiet: true,
                },
            })

            return response.json(meal);
        } catch (e) {
            return response.response.status(409).send();
        }
    }

    async findAll(response) {
        try {
            const meals = await prisma.meals.findMany()

            return response.json(meals);
        } catch (e) {
            return response.response.status(409).send();
        }
    }

    async countAllMeals(response) {
        try {
            const quantityMeals = await prisma.meals.count()

            return response.json(quantityMeals);
        } catch (e) {
            return response.response.status(409).send();
        }
    }

    async countAllMealsInDiet(response) {
        try {
            const quantityMealsInDiet = await prisma.meals.findMany({
                include: {
                    _count: {
                        select: { isInDiet: true },
                    },
                },
            })

            return response.json(quantityMealsInDiet);
        } catch (e) {
            return response.response.status(409).send();
        }
    }

    async countAllMealsOutDiet(response) {
        try {
            const quantityMealsOutDiet = await prisma.meals.findMany({
                include: {
                    _count: {
                        select: { isInDiet: false },
                    },
                },
            })

            return response.json(quantityMealsOutDiet);
        } catch (e) {
            return response.response.status(409).send();
        }
    }

    async getLongerMealSequence(response) {
        try {
            const longerMealSequence = await prisma.meals.groupBy({
                by: ['dateTime'],
                _sum: {
                    isInDiet: true,
                },
            })

            return response.json(longerMealSequence);
        } catch (e) {
            return response.response.status(409).send();
        }
    }
}

module.exports = MealsController;