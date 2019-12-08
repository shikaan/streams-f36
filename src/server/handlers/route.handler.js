const {getThrowException} = require('./exception.handler');

const getRouteHandler = (request, response) => (matcher, method, callback) => {
  const sendError = getThrowException(request, response);

  if (request.url.match(matcher)) {

    if (request.method === method) {
      callback(request, response)
    } else {
      sendError(Object.assign(new Error('Method not allowed'), {statusCode: 405}))
    }

    return true;
  }

  return false;
};

exports.getRouteHandler = getRouteHandler;
