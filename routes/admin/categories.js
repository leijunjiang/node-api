const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Category } = require('../../models')
const {
  NotFoundError,
  success,
  failure
} = require('../../utilis/response');

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

  const category = await Category.findByPk(id);
  if (!category) {
    throw new NotFoundError(`${id} ce titre n'existe pas!`)
  }

  return category
}

filterBody = (req) => {
  return {
    name: req.body.name,
    rank: req.body.rank
  }
}

module.exports = router;
