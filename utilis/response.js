class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

function success(res, message, data = {}, code = 200) {
  res.status(code).json({
    status: true,
    message,
    data
  });
}

function failure(req, res, error) {
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map(e => e.message);
    return res.status(400).json({
      status: false,
      message: 'request parameters errors',
      errors
    })
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
  NotFoundError,
  success,
  failure
}