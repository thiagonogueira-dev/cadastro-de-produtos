const { Sequelize } = require('sequelize');
const config = require('../config/config');
const configDB = config[process.env.NODE_ENV]

const User = require('../models/User');
const Product = require('../models/Product');
const BlackList = require('../models/BlackList');

require('../controller/BlackListController');

const connection = new Sequelize(configDB)

// connection.sync();
User.init(connection);
Product.init(connection);
BlackList.init(connection);

User.associate(connection.models);
Product.associate(connection.models);

module.exports = connection;