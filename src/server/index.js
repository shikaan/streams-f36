const {StaticController} = require("./www/static.controller");
const {createServer} = require('http');

const {StatsController} = require("./api/stats.controller");
const {StatsService} = require("./api/stats.service");

const {DashboardController} = require("./www/dashboard.controller");

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
 * Dashboard Module Initialization
 */
const dashboardController = new DashboardController();

/**
 * Static Module Initialization
 */
const staticController = new StaticController();

/**
 * @type {Server}
 */
const server = createServer((request, response) => {
  const send = getSend(request, response);

  if (request.url.match(StatsController.ROUTE_MATCHER)) {
    const stream = statsController.getCPUDataStream();

    stream.pipe(response);
  } else if (request.url.match(DashboardController.ROUTE_MATCHER)) {
    const stream = dashboardController.fetchIndex();

    stream.pipe(response)
  } else if (request.url.match(StaticController.ROUTE_MATCHER)) {
    staticController
      .fetch(request.url)
      .then(stream => stream.pipe(response))
      .catch(error => {
        if (error.code === 'ENOENT') {
          return send(404, 'Not Found')
        }
        send(500, error.message)
      })
  } else {
    send(404, 'Not Found')
  }
});

server.listen(1234, () => {
  const {address, port} = server.address();
  console.log(`Server started at ${address}:${port}`)
});
