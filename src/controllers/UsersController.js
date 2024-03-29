import {prisma} from "../utils";

class UsersController {
    async create(request, response) {
        try {
            const requestBody = request.body;

            const user = await prisma.users.create({
                data: {
                    name: requestBody.name,
                    email: requestBody.email,
                    password: requestBody.password,
                    age: requestBody.age,
                    height: requestBody.height,
                    phone: requestBody.phone,
                    weight: requestBody.weight,
                }
            })
        } catch (e) {
            return response.status(409).send();
        }
    }


}

module.exports = UsersController;