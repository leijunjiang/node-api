const express = require('express');
const router = express.Router();
const { Setting } = require('../../models')
const {
  NotFoundError,
  success,
  failure
} = require('../../utilis/response');



router.get('/', async function (req, res, next) {
  console.log('//////////////////')
  try {
    const setting = await getSetting()
    success(res, "Found an setting!", setting)
  } catch (error) {
    failure(res, error)
  }
})


router.put('/', async function (req, res, next) {
  try {
    const setting = await getSetting()
    await setting.update(req.body)

    success(res, 'setting updated with success!', data = { setting })
  } catch (error) {
    failure(res, error)
  }
});

async function getSetting() {
  const setting = await Setting.findOne();
  if (!setting) {
    throw new NotFoundError(`ce setting n'existe pas!`)
  }

  return setting
}

filterBody = (req) => {
  return {
    name: req.body.name,
    icp: req.body.icp,
    copyright: req.body.copyright
  }
}

module.exports = router;
