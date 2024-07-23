const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Chapter, Course } = require('../../models')
const {
  success,
  failure
} = require('../../utilis/responses');
const { NotFoundError } = require('../../utilis/errors')

router.get('/', async function (req, res, next) {
  try {
    const condition = getCondition()

    const chapter = await Chapter.findAll(condition);

    success(res, 'all chapter fetched', data = { chapter })
  } catch (error) {
    failure(res, error)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const chapter = await getChapters(req)
    success(res, "Found an chapter!", chapter)
  } catch (error) {
    failure(res, error)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const body = filterBody(req)
    const chapter = await Chapter.create(body);

    success(res, 'chapter created with success!', data = { chapter })
  } catch (error) {
    failure(res, error)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const chapter = await getChapters(req)
    await chapter.destroy()

    success(res, 'chapter deleted', data = { chapter })
  } catch (error) {
    failure(res, error)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const chapter = await getChapters(req)
    await chapter.update(req.body)

    success(res, 'chapter updated with success!', data = { chapter })
  } catch (error) {
    failure(res, error)
  }
});

async function getChapters(req) {
  const { id } = req.params;
  const condition = getCondition();
  const chapter = await Chapter.findByPk(id, condition);
  if (!chapter) {
    throw new NotFoundError(`${id} ce chapter n'existe pas!`)
  }

  return chapter
}

filterBody = (req) => {
  return {
    courseId: req.body.courseId,
    title: req.body.title,
    content: req.body.content,
    video: req.body.video,
    rank: req.body.rank,
  }
}

getCondition = () => {
  return {
    attributes: { exclude: ['CourseId'] },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name']
        },
      ],
      order: [['id', 'DESC']]
  }
}

module.exports = router;
