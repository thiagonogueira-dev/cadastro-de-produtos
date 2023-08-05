const { UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User = require('../models/User');
const BlackList = require('../models/BlackList');

const generateToken = (user) => {
    return token = jwt.sign({
        id: user.id,
        name: user.username
    }, authConfig.secret, {
        expiresIn: 604800 // 7 dias em segundos
    });
}

module.exports = {
    async register(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.create({ username, password }, { returning: ['id', 'username', 'created_at'] });
            user.password = undefined;

            res.status(201).json({
                user
            });

        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                return res.status(409).json({
                    message: 'Nome de usuário indisponível'
                });
            } else {
                res.status(500).json({
                    error
                });
            }
        }
    },

    async authenticate(req, res) {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(401).json({
                message: 'Usuário ou senha incorretos'
            });
        }

        if (! await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                message: 'Usuário ou senha incorretos'
            });
        }

        user.password = undefined;
        token = generateToken(user);
        res.cookie('authorization', token, {
            httpOnly: true
        });

        res.status(200).json({
            user
        })
    },

    async logout(req, res) {
        try {
            const authHeader = req.headers.authorization;
            token = authHeader.split(' ')[1];
            const user = req.usserLogged;

            const expirationDate = new Date(user.exp * 1000); // tempo de expiração do token

            const deniedToken = await BlackList.create({
                token: token, expiration_date: expirationDate
            });

            res.status(201).json({
                deniedToken
            });
        } catch (error) {
            res.status(500).json({
                message: "Erro ao fazer logout"
            })
        }
    }
}