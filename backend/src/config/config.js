require('dotenv').config(); 

module.exports =
{
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PSW,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "dialectOptions": {
      "ssl": {
          "require": true,
          "rejectUnauthorized": false
      },
      "useUTC": false
    },
    "define": {
      "underscored": true
    },
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PSW,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "dialectOptions": {
      "ssl": {
          "require": true,
          "rejectUnauthorized": false
      }
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PSW,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "dialectOptions": {
      "ssl": {
          "require": true,
          "rejectUnauthorized": false
      }
    }
  }
}
