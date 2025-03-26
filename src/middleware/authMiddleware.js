const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Access Denied!' });
    }

    try {
        const decoded = jwt.verify(token, 'sua_chave_secreta'); // Verifica o token
        req.user = decoded; // Salva a informação do usuário no request
        next(); // Prossegue para o próximo middleware ou rota
    } catch (error) {
        return res.status(401).json({ error: 'Authentication failed!' });
    }
};

module.exports = authenticate;