const http = require('http');
const debug = require('debug')('stream-f36');

const self = require('./self');
const session = require('./session');
const stats = require('./stats');

const {config} = require('./_config');
const {HTTP_METHOD, getThrowException, cors, RouteMatcher} = require('./_utils');

const server = http.createServer(async (req, res) => {
  const routeMatcher = new RouteMatcher(req, res, debug);
  const sendError = getThrowException(req, res);

  cors({allowed: true})(req, res);

  try {
    await routeMatcher.match('/api/stats', {exact: true}, {
      [HTTP_METHOD.GET]: stats
    });

    await routeMatcher.match('/api/session', {exact: true}, {
      [HTTP_METHOD.POST]: session
    });

    await routeMatcher.match('/api/self', {exact: true}, {
      [HTTP_METHOD.GET]: self
    })
  } catch (e) {
    sendError(e)
  }

});


server.listen(config.environment.PORT, () => {
  const {port, address} = server.address();

  console.log(`Application started @ ${address}:${port}`);
});

