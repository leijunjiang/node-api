const express = require('express');
const router = express.Router();
const { Setting } = require('../models');
const { NotFoundError } = require('../utilis/errors')
const { success, failure } = require('../utilis/responses');


router.get('/', async function(req, res, next) {
  try {
    const setting = await Setting.findOne();
    if(!setting) {
      throw new NotFoundError('setting not found')
    }

    success(res, 'setting fetched.', { setting })
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
