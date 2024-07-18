const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Article } = require('../../models')
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
    const articles = await Article.findAll(condition);

    success(res, 'all articles fetched', data = { articles })
  } catch (error) {
    failure(res, error)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const article = await getArticle(req)
    success(res, "Found an article!", article)
  } catch (error) {
    failure(res, error)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const body = filterBody(req)
    const article = await Article.create(body);

    success(res, 'article created with success!', data = { article })
  } catch (error) {
    failure(res, error)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const article = await getArticle(req)
    await article.destroy()

    success(res, 'article deleted', data = { article })
  } catch (error) {
    failure(res, error)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const article = await getArticle(req)
    await article.update(req.body)

    success(res, 'article updated with success!', data = { article })
  } catch (error) {
    failure(res, error)
  }
});

async function getArticle(req) {
  const { id } = req.params;

  const article = await Article.findByPk(id);
  if (!article) {
    throw new NotFoundError(`${id} ce titre n'existe pas!`)
  }

  return article
}

filterBody = (req) => {
  return {
    title: req.body.title,
    content: req.body.content
  }
}

module.exports = router;
