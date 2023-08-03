const { UniqueConstraintError } = require('sequelize')

const User = require('../models/User');
const Product = require('../models/Product');


module.exports = {
    async createUser(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.create({ username, password }, { returning: ['id', 'username', 'created_at'] });
            user.password = undefined;

            res.status(201).json({
                user
            });

        } catch (error) {
            if(error instanceof UniqueConstraintError) {
                return res.status(409).json({
                    message: 'Nome de usuário indisponível'
                });
            } else {
                res.status(400).json({
                    error
                });
            }
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            const exists = await User.findOne({ where: { id } });
            if (!exists) {
                return res.status(404).json({
                    message: 'Nenhum usuário encontrado'
                });
            }

            const user = await User.update({ name, email }, { where: { id }, returning: true })
            res.status(200).json({
                user
            });
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    },

    async listUsers(req, res) {
        try {
            // const users = await User.findAll({ order: [['id', 'ASC']] });
            // if (!users) {
            //     return res.status(200).json({
            //         message: 'Não existem usuários cadastrados'
            //     });
            // }

            // res.status(200).json({
            //     users
            // });

            Product.create({
                name: 'p1',
                price: 198.12,
                user_id: 1
            })

        } catch (error) {
            res.status(400).json({
                error
            });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({
                    message: 'Usuário não encontrado'
                });
            }

            await User.destroy({ where: { id } });
            res.status(204).json({});
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    }
}