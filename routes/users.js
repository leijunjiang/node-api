const express = require('express');
const router = express.Router();
const { User } = require('../models')
const { success, failure } = require('../utilis/responses');
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../utilis/errors');

/* GET users listing. */
router.get('/me', async function(req, res, next) {
  try {
    const user = await getUser(req);
    success(res, 'user found.', { user });

  } catch (error) {
    failure(res, error);
  }

});

async function getUser(req) {
  const id = req.userId;
  const user = await User.findByPk(id);

  if(!user) {
    throw new NotFoundError(`ID: ${id} user not found.`)
  }

  return user;
}

module.exports = router;
