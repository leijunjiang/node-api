'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title should exsit.',
        },
        notEmpty: {
          msg: 'title should not be empty',
        },
        len: {
          args: [2, 45],
          msg: 'title length betwwen 2 and 45',
        },
      },
    },
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};