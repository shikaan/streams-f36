const {createServer} = require('http');
const {Sequelize} = require('sequelize');

const {User} = require("./api/users/users.model");
const {UsersRepository} = require("./api/users/users.repository");

const {SessionController} = require("./api/session/session.controller");
const {SessionService} = require("./api/session/session.service");

const {StatsController} = require("./api/stats/stats.controller");
const {StatsService} = require("./api/stats/stats.service");

const getSend = (request, response) => (status, message, payload, contentType = 'text/plain') => {
  response.writeHead(status, message, {'Content-Type': contentType});
  response.write(payload || `${status} - ${message}`);
  response.end()
};

const errorHandler = (request, response) => (error) => {
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

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/data.db'
});

/**
 * Stats Module Initialization
 */
const statsService = new StatsService();
const statsController = new StatsController(statsService);

/**
 * Users Module Initialization
 */
User.init(User.DEFINITIONS, {sequelize});
const usersRepository = new UsersRepository(User);
// const usersService = new UsersService(usersRepository);
// const usersController = new UsersController(usersService);

/**
 * Session Module Initialization
 */
const sessionService = new SessionService(usersRepository);
const sessionController = new SessionController(sessionService);

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
  } else if (request.url.match(SessionController.ROUTE_MATCHER)) {
    const chunks = [];
    request
      .on('data', chunk => chunks.push(Buffer.from(chunk).toString('utf-8')))
      .on('error', errorHandler(request, response))
      .on('end', () => {
        const formData = chunks.join();

        sessionController
          .create(formData)
          .then(session => {
            send(201, 'Created', session)
          })
          .catch(errorHandler(request, response))

      })
  } else {
    send(404, 'Not Found')
  }
});

sequelize
  .sync()
  .then(() => {
    server.listen(1234, () => {
      const {address, port} = server.address();
      console.log(`Server started at ${address}:${port}`)
    });
  });

