const getExceptionHandler = (request, response) => (error = {}) => {
  if (response.headersSent) {
    return;
  }

  if (!error.statusCode) {
    if (error.code === "ENOENT") {
      response.statusCode = 404;
    } else {
      response.statusCode = 500;
    }
  }

  response.statusCode = error.statusCode || 500;

  response.write(error.message || 'Unexpected error');
  response.end()
};

exports.getThrowException = getExceptionHandler;
