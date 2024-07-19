const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { User } = require('../../models')
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
    const user = await User.findAll(condition);

    success(res, 'all user fetched', data = { user })
  } catch (error) {
    failure(res, error)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const user = await getUser(req)
    success(res, "Found an user!", user)
  } catch (error) {
    failure(res, error)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const body = filterBody(req)
    const user = await User.create(body);

    success(res, 'user created with success!', data = { user })
  } catch (error) {
    failure(res, error)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await getUser(req)
    await user.destroy()

    success(res, 'user deleted', data = { user })
  } catch (error) {
    failure(res, error)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const user = await getUser(req)
    await user.update(req.body)

    success(res, 'user updated with success!', data = { user })
  } catch (error) {
    failure(res, error)
  }
});

async function getUser(req) {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFoundError(`${id} ce user n'existe pas!`)
  }

  return user
}

filterBody = (req) => {
  return {
    name: req.body.email,
    password: req.body.password,
    role: req.body.role,
  }
}

module.exports = router;
