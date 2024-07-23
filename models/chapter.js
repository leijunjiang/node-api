'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment/moment');
moment.locale('fr')
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Chapter.belongsTo(models.Course, { as: 'course' })
    }
  }

  Chapter.init({
    courseId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    video: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("createdAt")).format("LL")
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("updatedAt")).format("LL")
      }
    },
  }, {
    sequelize,
    modelName: 'Chapter',
  });
  return Chapter;
};