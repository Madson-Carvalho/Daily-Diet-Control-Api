const jwt = require('jsonwebtoken');

function authenticateToken(request, response, next) {
    const token = request.header('Authorization')?.split(' ') || [' ', ' '];
    if (!token) return response.status(401).json({error: 'Access denied'});
    try {
        const decoded = jwt.verify(token[1], "1040FF");
        request.id = decoded.id;
        next();
    } catch (error) {
        response.status(401).json({error: 'Invalid token'});
    }
}

module.exports = authenticateToken;