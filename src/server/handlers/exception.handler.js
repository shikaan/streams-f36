const getExceptionHandler = (request, response) => (error) => {
  response.statusCode = error.statusCode;

  if (!error.statusCode) {
    if (error.code === "ENOENT") {
      response.statusCode = 404;
    } else {
      response.statusCode = 500;
    }
  }

  response.write(error.message);
  response.write('\n');
  response.end()
};

exports.getThrowException = getExceptionHandler;
