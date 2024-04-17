const prisma = require("../utils");
const jwt = require("jsonwebtoken");

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

            response.json(user);
        } catch (e) {
            return response.status(409).send();
        }
    }

    async login(request, response) {
        try {
            const { name, password } = request.body;

            const user = await prisma.users.findUnique({
                where: {
                    name: name,
                    password: password
                },
            });
            
            if (!user) {
                return response.status(401).json({ error: 'User or Password Incorrected' });
            }
    
            const token = jwt.sign({ id: user.id }, '1040FF', {
                expiresIn: '60m',
            });
    
            response.status(200).json({ token });
    
        } catch (error) {
            response.status(500).json({ error: "Login failed" });
        }
    }
}

module.exports = UsersController;