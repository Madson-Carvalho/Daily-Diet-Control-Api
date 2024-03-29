const {prisma} = require("../utils");

class MealsController {
    async create(request, response) {
        try {
            const requestBody = request.body;

            const meals = prisma.meals.create({
                data: {
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

}

module.exports = MealsController;