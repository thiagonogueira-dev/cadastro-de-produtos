const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {

    static init(sequelize) {
        super.init({
            username: DataTypes.STRING,
            password: DataTypes.STRING,
         }, 
        {
            sequelize,
            underscored: true,
            hooks: {
                async beforeCreate(user, options){
                    user.password = await bcrypt.hash(user.password, 10);
                }
            }
        })
    }

    static associate(models) {
        this.hasMany(models.Product, { foreignKey: 'user_id' });
    }
}


module.exports = User;