'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
        id: {
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE()
        },
        updated_at: {
          type: Sequelize.DATE
        }
      }, {
        timezone
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
