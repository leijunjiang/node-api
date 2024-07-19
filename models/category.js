'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'nom deja existé' },
      validate: {
        notNull: { msg: 'nom ne doit pas etre null' },
        notEmpty: { msg: 'nom ne doit pas etre empty' },
        len: { arg: [2, 5], msg: 'length entre 2 et 45' }
      }
    },
        
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'nom ne doit pas etre null' },
        notEmpty: { msg: 'nom ne doit pas etre empty' },
        isInit: {msg: 'doit etre integer' },
        isPositive(value) {
          if (value <= 0) {
            throw new Error('doit etre positive integer')
          }
        }
      }
    } 
    
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};