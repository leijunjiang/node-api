const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { User } = require('../../models')
const {
  success,
  failure
} = require('../../utilis/responses');
const { NotFoundError, UnauthorizedError } = require('../../utilis/errors');
const { BadRequestError } = require('../../utilis/errors');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/sign_in', async function (req, res, next) {
  try {
    const { login, password } = req.body;

    console.log(login)
    if(!login) {
      throw new BadRequestError('email / user doit etre la')
    }

    if(!password) {
      throw new BadRequestError('password doit etre la')
    }

    const condition = {
      where : {
        [Op.or]: [
          { email: login },
          { username: login }
        ]
      }
    }

    const user = await User.findOne(condition); 

    if(!user) {
      throw new NotFoundError('user does not exist, unable to login')
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      data = {}
    } else {
      data = user
    }

    if (user.role !== 100) {
      throw new UnauthorizedError('you are not admin')
    }

    const token = jwt.sign({
        userId: user.id
      }, process.env.SECRET, { expiresIn: '30d' }
    )

    success(res, 'auth success', token)
  } catch (error) {
    failure(res, error)
  }
});
module.exports = router;
