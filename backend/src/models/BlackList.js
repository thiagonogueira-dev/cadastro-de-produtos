const { Model, DataTypes } = require('sequelize');

class BlackList extends Model {

    static init(sequelize) {
        super.init({
            token: DataTypes.STRING,
            expiration_date: DataTypes.DATE,
         }, 
        {
            sequelize,
            underscored: true,
            tableName: 'black_list'
        })
    }
}

module.exports = BlackList;