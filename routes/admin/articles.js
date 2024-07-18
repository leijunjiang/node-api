const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Article } = require('../../models')
const {
  NotFoundError,
  success,
  failure
} = require('../../utilis/response');

router.get('/', async function(req, res, next) {
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
    res.json({
      status: true,
      message: 'found an article',
      data: {
        articles
      }
    });
  } catch (error) {
    failure(req, error)
  }

});

router.get('/:id', async function(req, res, next) {
  try {
    const article = await getArticle(req, res)
    success(res, "Found an article!", article)
  } catch (error) {
    failure(req, res, error)
  }
})

router.post('/', async function(req, res, next) {
  try {
    const body = filterBody(req)

    const article = await Article.create(body);
    
    res.status(201).json({
      status: true,
      message: 'article created with success!',
      data: article
    })
  } catch (error) {
    failure(req, error)
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);
    
    if (article) {
      await article.destroy()

      res.json({
        status: true,
        message: 'article deleted with success!',
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'article not found',
      })
    }
  } catch (error) {
    failure(req, error)
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);
    
    if (article) {
      await article.update(req.body )

      res.json({
        status: true,
        message: 'article updated with success!',
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'article not found',
      })
    }
  } catch (error) {
    failure(req, error)
  }
});

getArticle = async (req, res) => {
  console.log("req.params")
  console.log(req.params)
  const { id } = req.params;
  try {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError
    }
    return article
  } catch (error) {
    throw new failure(res, error)
  }

}

filterBody = (req) => {
  return {
    title: req.body.title,
    content: req.body.content
  }
}

module.exports = router;
