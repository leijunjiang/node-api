'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        username: 'admin',
        password: bcrypt.hashSync('123123', 10),
        nickname: 'admin',
        sex: 2,
        role: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user1@example.com',
        username: 'user1',
        password: bcrypt.hashSync('123123', 10),
        nickname: 'user1',
        sex: 0,
        role: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@example.com',
        username: 'user2',
        password: bcrypt.hashSync('123123', 10),
        nickname: 'user2',
        sex: 0,
        role: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@example.com',
        username: 'user3',
        password: bcrypt.hashSync('123123', 10),
        nickname: 'user3',
        sex: 2,
        role: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
