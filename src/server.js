const express = require("express");
const routes = require("./routes");
const verifyToken = require("./auth");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.get('/login', async (request, response) => {
    try {
        const {username, password} = request.body;
        const user = {username, password};
        if (!user) {
            return response.status(401).json({error: 'Authentication failed'});
        }
        const passwordMatch = password === '1234';
        if (!passwordMatch) {
            return response.status(401).json({error: 'Authentication failed'});
        }
        const token = jwt.sign({id: '8008f808-b4d4-4614-b747-23aee5e4edaf'}, '1040FF', {
            expiresIn: '1h',
        });
        response.status(200).json({token});
    } catch (error) {
        response.status(500).json({error: 'Login failed'});
    }
});

app.use(routes);
app.use('*', verifyToken);

app.get('/private', (request, response) => {
    response.status(200).json({message: 'Protected route accessed'});
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));