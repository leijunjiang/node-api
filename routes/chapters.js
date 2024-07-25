const express = require('express');
const router = express.Router();
const { Course, Category, Chapter, User } = require('../models');
const { NotFoundError } = require('../utilis/errors')
const { success, failure } = require('../utilis/responses')


router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;

    const condition = {
      attributes: { exclude: ['CourseId'] },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'nickname', 'avatar', 'company']
            }
          ]
        },
      ]
    }

    const chapter = await Chapter.findByPk(id, condition);

    if (!chapter) {
      throw new NotFoundError(`ID: ${id} course not found.`)
    }

    const chapters = await Chapter.findAll({
      attributes: { exclude: ['CourseId', 'content'] },
      where: { courseId: chapter.courseId },
      order: [['rank', 'ASC'], ['id', 'DESC']]
    })

    success(res, 'courses data fetched', { chapter, chapters })
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
