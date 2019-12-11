const http = require('http');

const self = require('./self');
const session = require('./session');
const stats = require('./stats');

const {config} = require('./_config');
const {HTTP_METHOD, getThrowException} = require('./_utils');
const {NotFoundException, MethodNotAllowedException} = require("./_exceptions");

const getMatchRoute = (request, response) => {
  const sendError = getThrowException(request, response);
  let matched = false;

  return (matcher, options, handlers) => {
    const cleanUrl = request.url.replace('//', '/');
    const handler = handlers[request.method];
    const methods = Object.keys(handlers);

    if (matched) {
      return;
    }

    if (!methods.includes(request.method)) {
      return sendError(new MethodNotAllowedException())
    }

    if (!handler) {
      return sendError(new NotFoundException())
    }

    if (options.exact) {
      if (cleanUrl === matcher) {
        matched = true;
        return handler(request, response)
      }
    } else {
      const regExpMather = new RegExp(matcher);

      if (regExpMather.test(cleanUrl)) {
        matched = true;
        return handler(request, response)
      }
    }
  };
};

const server = http.createServer((req, res) => {
  const matchRoute = getMatchRoute(req, res);

  matchRoute('/api/stats', {exact: true}, {
    [HTTP_METHOD.GET]: stats
  });

  matchRoute('/api/session', {exact: true}, {
    [HTTP_METHOD.POST]: session
  });

  matchRoute('/api/self', {exact: true}, {
    [HTTP_METHOD.GET]: self
  })
});


server.listen(config.environment.PORT, () => {
  const {port, address} = server.address();

  console.log(`Application started @ ${address}:${port}`);
});

