const express = require('express');
const router = express.Router();
const { User } = require('../../models')
const { Sequelize, Op } = require('sequelize');
// const { sql } = require('@sequelize/core');
const {
  success,
  failure
} = require('../../utilis/responses');
const { NotFoundError } = require('../../utils/errors')

const { NotFoundError } = require('../utils/errors')

router.get('/sex', async function (req, res, next) {
  try {
    const male = await User.count({ where: { sex: 0 } });
    const female = await User.count({ where: { sex: 1 } })
    const unknown = await User.count({ where: { sex: 2 } })

    const data = [
      { value: male, name: 'male' },
      { value: female, name: 'female' },
      { value: unknown, name: 'unknown' }
    ]
    success(res, 'all sexes fetched', data)
  } catch (error) {
    failure(res, error)
  }
});

router.get('/user', async function (req, res, next) {
  try {
    const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
      host: 'localhost',
      dialect: 'mysql' // or 'postgres', 'sqlite', etc.
    });

    const [result] = await sequelize.query(
      `
      select DATE_FORMAT(createdAt, '%Y-%m') AS month,
      COUNT(*) as value
      from Users
      GROUP BY month
      ORDER BY month ASC;
      `
    )

    const data = {
      months: [],
      values: []
    }

    result.forEach(item => {
      data.months.push(item.month);
      data.values.push(item.values);
    })

    success(res, 'all sexes fetched', data)
  } catch (error) {
    failure(res, error)
  }
});



module.exports = router;
