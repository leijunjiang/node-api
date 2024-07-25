const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { User } = require('../models')
const { success, failure } = require('../utilis/responses');
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../utilis/errors');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/sign_up', async function (req, res, next) {
  try {
    const body = { 
      email: req.body.email, 
      username: req.body.username,
      nickname: req.body.nickname,
      password: req.body.password,
      sex: 2,
      role: 0
    }

    const user = await User.create(body)
    delete user.dataValues.password;
    
    success(res, 'user creation success', {user}, 201)
  } catch (error) {
    failure(res, error)
  }
});
module.exports = router;
