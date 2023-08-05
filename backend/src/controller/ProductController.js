const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {

    async createProduct(req, res) {
        try {
            const { name, price } = req.body;
            const user_id = req.usserLogged.id;

            const product = await Product.create({ name, price, user_id });

            res.status(201).json({
                product
            });


        } catch (error) {
            res.status(500).json({
                message: "Erro ao cadastrar o produto",
                error
            })
        }
    },

    async getAll(req, res) {
        try {
            const user_id = req.usserLogged.id;

            const user = await User.findByPk(user_id);
            const products = await user.getProducts({
                attributes: ['id', 'name', 'price']
            });
            console.log(products);

            res.status(200).json({
                products
            });
        } catch (error) {
            res.status(500).json({
                message: "Erro ao carregar os produtos"
            });
        }
    },

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            const deletedRows = await Product.destroy({ where: { id } });
            if (deletedRows > 0) {
                return res.status(204).send();
            } 
        
            res.status(404).json({
                message: "Produto não encontrado"
            });
        } catch (error) {
            res.status(500).json({
                message: "Erro ao deletar produto"
            });
        }
    },

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, price } = req.body;

            const product = await Product.update({ name, price }, { where: { id }, returning: true})

            if(!product[0]) {
                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }

            res.status(200).json({
                product: product[1]
            });
        } catch (error) {
            res.status(500).json({
                message: "Erro ao atualizar produto"
            });
        }
    }

}