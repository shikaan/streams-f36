const {createServer} = require('http');

const {StatsController} = require("./api/stats.controller");
const {StatsService} = require("./api/stats.service");

const getSend = (request, response) => (status, message, contentType = 'text/plain') => {
  response.writeHead(status, message, {'Content-Type': contentType});
  response.write(`${status} - ${message}`);
  response.end()
};

const errorHandler = (request, response) => (error) => {
  if (error.code === "ENOENT") {
    response.statusCode = 404;
  } else {
    response.statusCode = 500;
  }

  response.write(error.message);
  response.write('\n');
  response.end()
};

/**
 * Stats Module Initialization
 */
const statsService = new StatsService();
const statsController = new StatsController(statsService);

/**
 * @type {Server}
 */
const server = createServer((request, response) => {
  const send = getSend(request, response);

  // ALLOW CORS
  if (request.headers.origin) {
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
  }

  if (request.url.match(StatsController.ROUTE_MATCHER)) {
    const stream = statsController.getCPUDataStream();

    stream
      .pipe(response)
      .on('error', errorHandler(request, response))
  } else {
    send(404, 'Not Found')
  }
});

server.listen(1234, () => {
  const {address, port} = server.address();
  console.log(`Server started at ${address}:${port}`)
});
