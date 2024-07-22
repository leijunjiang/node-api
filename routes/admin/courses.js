const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Course, Category, User } = require('../../models')
const {
  success,
  failure
} = require('../../utilis/responses');
const { NotFoundError } = require('../../utils/errors')

router.get('/', async function (req, res, next) {
  try {
    const query = req.query
    const condition = getCondition()

    console.log(query)
    if (query.categoryId) {
      condition.where = {
        categoryId: {
          [Op.like]: `%${query.categoryId}`
        }
      }
    }

    if (query.userId) {
      condition.where = {
        userId: {
          [Op.like]: `%${query.userId}`
        }
      }
    }

    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${query.name}`
        }
      }
    }
    // attention boolean 
    // /admin/courses?recommended=true&introductory=false
    if (query.recommended) {
      condition.where = {
        recommended: {
          [Op.eq]: query.recommended === 'true'
        }
      }
    }

    if (query.introductory) {
      condition.where = {
        introductory: {
          [Op.eq]: query.introductory === "true"
        }
      }
    }

    console.log(condition)
    const course = await Course.findAll(condition);

    success(res, 'all course fetched', data = { course })
  } catch (error) {
    failure(res, error)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const course = await getCourse(req)
    success(res, "Found an course!", course)
  } catch (error) {
    failure(res, error)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const body = filterBody(req)
    const course = await Course.create(body);

    success(res, 'course created with success!', data = { course })
  } catch (error) {
    failure(res, error)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const course = await getCourse(req)

    const count = await Chapter.count({ where: {courseId: req.params,id }});

    if (count < 0) {
      throw new error('cec cours a des chappters, no deletable!')
    }
    await course.destroy()

    success(res, 'course deleted', data = { course })
  } catch (error) {
    failure(res, error)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const course = await getCourse(req)
    await course.update(req.body)

    success(res, 'course updated with success!', data = { course })
  } catch (error) {
    failure(res, error)
  }
});

async function getCourse(req) {
  const { id } = req.params;

  const course = await Course.findByPk(id);
  if (!course) {
    throw new NotFoundError(`${id} ce course n'existe pas!`)
  }

  return course
}

filterBody = (req) => {
  return {
    categoryId: req.body.categoryId,
    userId: req.body.userId,
    name: req.body.name,
    image: req.body.image,
    recommended: req.body.recommended,
    introductory: req.body.introductory,
    content: req.body.content,
  }
}

getCondition = () => {
  return {
    attributes: { exclude: ['CategoryId', 'UserId'] },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatar']
        }
      ],
      order: [['id', 'DESC']]
  }
}

module.exports = router;
