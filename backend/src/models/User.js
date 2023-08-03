const { Model, DataTypes, DATE } = require('sequelize');
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
                    console.log(user.createdAt)
                    user.createdAt = null
                    let a = new Date().toLocaleString('pt-BR')
                    a = a.replace(/\//g, '-').replace(',', '').replace(' ', 'T') + '.000Z';
                    console.log(user.createdAt)
                    const parts = a.split(/[-T:.Z]/); // Divide a string em partes
                    
                    // Cria uma nova data com as partes extraídas da string
                    console.log(parts);
                    const date = new Date(parts[2], parts[1] - 1, parts[0], parts[3] - 3, parts[4], parts[5])
                    console.log(date);
                    user.createdAt = date
                }
            }
        })
    }

    static associate(models) {
        this.hasMany(models.Product, { foreignKey: 'user_id' });
    }
}


module.exports = User;