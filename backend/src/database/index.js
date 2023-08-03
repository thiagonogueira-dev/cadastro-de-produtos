const { Sequelize } = require('sequelize');
const configDB = require('../config/config');
const config = configDB[process.env.NODE_ENV]

const User = require('../models/User');
const Product = require('../models/Product');

const connection = new Sequelize({ 
    ...config,
    timezone: '-3:00',
    dialectOptions: {
        ssl: {
            "require": true,
            "rejectUnauthorized": false
        },
        useUTC: false
    }
})

connection.sync();
User.init(connection);
Product.init(connection);
User.associate(connection.models);
Product.associate(connection.models);

module.exports = connection;