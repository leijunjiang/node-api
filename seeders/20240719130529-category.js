'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      { name: 'front dev',rank: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'back dev',rank: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'mobile dev',rank: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'database',rank: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'server',rank: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'public',rank: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
