const express = require('express');
const router = express.Router();
const { Course, Category, Chapter, User } = require('../models');
const { NotFoundError } = require('../utilis/errors')
const { success, failure } = require('../utilis/responses')


router.get('/', async function(req, res, next) {
  try {
    // const query = req.query;
    // const currentPage = Math.abs(Number(query.currentPage)) || 1;
    // const pageSize = Math.abs(Number(query.pageSize)) || 1;
    // const offset = (currentPage - 1) * pageSize;

    const condition = {
      attributes: { exclude: ['CategoryId', 'UserId', 'content'] },
    }

    const { count, rows } = await Course.findAndCountAll(condition);
    if (!rows) {
      throw new NotFoundError(`ID: ${id} course not found.`)
    }

    success(res, 'courses data fetched', { rows })
  } catch (error) {
    failure(res, error);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;

    const condition = {
      attributes: { exclude: ['CategoryId', 'UserId'] },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: Chapter,
          as: 'chapters',
          attributes: ['id', 'title', 'rank', 'createdAt'],
          order: [['rank', 'ASC'], ['id', 'desc']]
        },
        {
          model: User,
          as: 'user',
          attributes: ['id','username', 'nickname', 'avatar', 'company']
        },
      ]
    }


    const course = await Course.findByPk(id, condition);

    if (!course) {
      throw new NotFoundError(`ID: ${id} course not found.`)
    }

    success(res, 'courses data fetched', { course })
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
