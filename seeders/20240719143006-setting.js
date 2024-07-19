'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Settings', [{ 
      name: '法国',
      icp: 'numero 1234',
      copyright: 'hahah, all rights reserved.',
      createdAt: new Date(),
      updatedAt: new Date() 
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Settings', null, {});
  }
};
