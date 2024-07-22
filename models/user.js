'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Course, { as: 'courses' });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'email not null' },
        notEmpty: { msg: 'email not empty' },
        isEmail: { msg: 'email format not correct' },
        async isUnique(value) {
          const user = await User.findOne({ where: { email: value } })
          if (user) {
            throw new Error('email deja existant, please login')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'password should not be null'},
        notEmpty: { msg: 'password should not be empty'}
      },
      set(value) {
        if (value.length >= 6 && value.length <= 45) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        } else {
          throw new Error('password length between 6 - 45 .')
        }
      }
    },
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    sex: DataTypes.TINYINT,
    company: DataTypes.STRING,
    introduce: DataTypes.TEXT,
    role: DataTypes.TINYINT,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};