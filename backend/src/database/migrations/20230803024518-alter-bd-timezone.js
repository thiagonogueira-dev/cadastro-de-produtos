'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('ALTER DATABASE "products-crud" SET timezone = \'America/Sao_Paulo\';')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('ALTER DATABASE "products-crud" SET timezone = \'UTC\';');
  }
};
