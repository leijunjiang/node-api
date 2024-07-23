const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Category, Course } = require('../../models')
const {
  success,
  failure
} = require('../../utilis/responses');
const { NotFoundError } = require('../../utilis/errors')

router.get('/', async function (req, res, next) {
  try {
    const query = req.query
    const condition = {
      order: [['id', 'DESC']]
    }
    if (query.title) {
      condition.where = {
        title: {
          [Op.like]: `%${query.title}`
        }
      }
    }
    const category = await Category.findAll(condition);

    success(res, 'all category fetched', data = { category })
  } catch (error) {
    failure(res, error)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const category = await getCategory(req)
    success(res, "Found an category!", category)
  } catch (error) {
    failure(res, error)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const body = filterBody(req)
    const category = await Category.create(body);

    success(res, 'category created with success!', data = { category })
  } catch (error) {
    failure(res, error)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const category = await getCategory(req)

    const count = await Course.count({ where: { categoryId: req.params.id }})
    if (count > 0) {
      throw new Error('unable to delete due to its associated courses')
    }

    await category.destroy()

    success(res, 'category deleted', data = { category })
  } catch (error) {
    failure(res, error)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const category = await getCategory(req)
    await category.update(req.body)

    success(res, 'category updated with success!', data = { category })
  } catch (error) {
    failure(res, error)
  }
});

async function getCategory(req) {
  const { id } = req.params;

  const condition = {
    include: [
      {
        model: Course,
        as: 'courses',
      }
    ]
  }

  const category = await Category.findByPk(id, condition);
  if (!category) {
    throw new NotFoundError(`${id} ce category n'existe pas!`)
  }

  return category
}

const filterBody = (req) => {
  return {
    name: req.body.name,
    rank: req.body.rank
  }
}

module.exports = router;
