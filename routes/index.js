const express = require('express');
const router = express.Router();
const { Course, Category, User } = require('../models');
const { success, failure } = require('../utilis/responses');


router.get('/', async function(req, res, next) {
  try {
    const recommendedCourses = await Course.findAll({
      attributes: { exclude: ['CategoryId', 'UserId', 'content'] },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'nickname', 'avatar', 'company']
        },
      ],
      where: { recommended: true },
      order: [['id', 'desc']],
      limit: 10
    });

    const likesCourses = await Course.findAll({
      attributes: { exclude: ['CategoryId', 'UserId', 'content' ] },
      order: [['likesCount', 'desc'], ['id', 'desc']],
      limit: 10
    });

    const introductoryCourses = await Course.findAll({
      attributes: { exclude: ['CategoryId', 'UserId', 'content' ] },
      where: { introductory: true },
      order: [['id', 'desc']],
      limit: 10
    });

    success(res, 'index data fetched', {
      recommendedCourses,
      likesCourses,
      introductoryCourses
    })
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
