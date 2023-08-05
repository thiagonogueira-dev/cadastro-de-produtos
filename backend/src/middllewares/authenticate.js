const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.js');

const BlackList = require('../models/BlackList');

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token de autenticação não encontrado"
        });
    }

    const parts = authHeader.split(" ")

    if (parts.length !== 2) {
        return res.status(401).json({
            message: "Token inválido"
        })
    }

    const [scheme, token] = parts;

    if (!(scheme === "Bearer")) {
        return res.status(401).json({
            error: true,
            message: "Token inválido"
        })
    }

    jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Token inválido/expirado"
            });
        }

        const verifyBlackList = await BlackList.findOne({ where: { token } })
        if (verifyBlackList) {
            return res.status(401).json({
                message: "Token inválido/expirado"
            })
        }

        req.usserLogged = decoded;

        return next();
    });
}