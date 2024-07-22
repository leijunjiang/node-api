function success(res, message, data = {}, code = 200) {
  res.status(code).json({
    status: true,
    message,
    data
  });
}

function failure(res, error) {
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map(e => e.message);
    return res.status(400).json({
      status: false,
      message: 'request parameters errors',
      errors
    })
  }

  if (error.name === 'BadRequestError') {
    return res.status(400).json({
      status: false,
      message: 'error of request',
      errors : [error.message]
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: false,
      message: 'unauthorized error',
      errors : [error.message]
    });
  }


  if (error.name === 'NotFoundError') {
    return res.status(400).json({
      status: false,
      message: 'resources not exists',
      errors : [error.message]
    });
  }

  return res.status(500).json({
    status: false,
    message: 'server error',
    errors: [error.message]
  })
}
 
module.exports = {
  success,
  failure
}