const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Course } = require('../models');
const { NotFoundError } = require('../utilis/errors')
const { success, failure } = require('../utilis/responses');


router.get('/', async function(req, res, next) {
  try {
    const query = req.query;

    const condition = {
      attributes: { exclude: ['CategoryId', 'UserId', 'content'] }
    } 

    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${ query.name }%`
        }
      }
    }
    const { count, rows } = await Course.findAndCountAll(condition);

    success(res, 'index data fetched', {
      rows
    })
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
