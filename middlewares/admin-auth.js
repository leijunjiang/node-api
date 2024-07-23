const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UnauthorizedError } = require('../utilis/errors');
const { success, failure }  = require('../utilis/responses');

module.exports = async(req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      throw new UnauthorizedError('not authorized, need to login')
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const { userId } = decoded;
    const user = await User.findByPk(userId);

    if(!user) {
      throw new UnauthorizedError('user not exisited');
    }

    if (user.role !== 100) {
      throw new UnauthorizedError('you do not have the authorization for this api')
    }

    req.user = user

    next();
  } catch (error) {
    failure(res, error)
  }
}