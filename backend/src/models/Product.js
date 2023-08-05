const { Model, DataTypes } = require('sequelize')

class Product extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            price: DataTypes.DECIMAL,
            user_id: DataTypes.INTEGER
        }, {
            sequelize,
            underscored: true,
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}

module.exports = Product;