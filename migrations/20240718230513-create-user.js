'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      sex: {
        allowNull: false,
        type: Sequelize.TINYINT
      },
      company: {
        type: Sequelize.STRING
      },
      introduce: {
        type: Sequelize.TEXT
      },
      role: {
        allowNull: false,
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  await queryInterface.addIndex(
    'Users', {
      fields: ['email'],
      unique: true
  });
  await queryInterface.addIndex(
    'Users', {
      fields: ['username'],
      unique: true
  });
  await queryInterface.addIndex(
    'Users', {
      fields: ['role']
  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};