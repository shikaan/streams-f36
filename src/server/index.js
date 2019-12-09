const {createServer} = require('http');
const {Sequelize} = require('sequelize');

const {User} = require("./api/users/users.model");
const {UsersRepository} = require("./api/users/users.repository");

const {SelfService} = require("./api/self/self.service");
const {SelfController} = require("./api/self/self.controller");

const {SessionController} = require("./api/session/session.controller");
const {SessionService} = require("./api/session/session.service");

const {StatsController} = require("./api/stats/stats.controller");
const {StatsService} = require("./api/stats/stats.service");

const {getSuccessHandler, getThrowException, getBodyParser, getRouteHandler, getCookieHandler} = require('./handlers');

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

/**
 * Self Module Initialization
 */
const selfService = new SelfService(usersRepository);
const selfController = new SelfController(selfService);

/**
 * Session Module Initialization
 */
const sessionService = new SessionService(usersRepository);
const sessionController = new SessionController(sessionService);

/**
 * @type {Server}
 */
const server = createServer((request, response) => {
    const send = getSuccessHandler(request, response);
    const sendError = getThrowException(request, response);
    const parseBody = getBodyParser(request);
    const parseCookies = getCookieHandler(request, response);
    const matchRoute = getRouteHandler(request, response);

    let matched = false;

    // ALLOW CORS
    if (request.headers.origin) {
      response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
      response.setHeader('Access-Control-Allow-Credentials', true);
    }

    if(request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
      response.setHeader('Access-Control-Allow-Methods', 'POST');

      return send(204)
    }

    matched = matchRoute(StatsController.ROUTE_MATCHER, 'GET', (request, response) => {
      const stream = statsController.getCPUDataStream();

      stream
        .pipe(response)
        .on('error', sendError)
    });

    if (!matched) {
      matched = matchRoute(SessionController.ROUTE_MATCHER, 'POST', () => {
        parseBody((error, body) => {
          if (error) {
            return sendError(e);
          }

          sessionController
            .create(body)
            .then(session => {
              send(201, 'Created', null, {'Set-Cookie': `auth_token=${session}; HttpOnly;`})
            })
            .catch(sendError)
        });
      });
    }

    if (!matched) {
      matched = matchRoute(SelfController.ROUTE_MATCHER, 'GET', () => {
        parseCookies((error, cookie) => {
          if (error) {
            return sendError(error);
          }

          selfController
            .fetch(cookie['auth_token'])
            .then(data => {
              send(200, 'OK', JSON.stringify(data), {}, 'application/json');
            });
        })
      });
    }

    if (!matched) {
      send(404, 'Not Found')
    }
  });

sequelize
  .sync()
  .then(() => {
    server.listen((process.env.PORT || 1234), () => {
      const {address, port} = server.address();
      console.log(`Server started at ${address}:${port}`)
    });
  });

