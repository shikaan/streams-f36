const {bodyParser, getThrowException, getSuccessHandler} = require("./_utils");

const {UsersRepository} = require("./users/users.repository");
const {User} = require("./users/users.model");
const {SessionController} = require("./session/session.controller");
const {SessionService} = require("./session/session.service");

const {config} = require('./_config');

User.init(User.DEFINITIONS, {sequelize: config.database});
const usersRepository = new UsersRepository(User);
const sessionService = new SessionService(usersRepository);
const sessionController = new SessionController(sessionService);

module.exports = async (request, response) => {
  const send = getSuccessHandler(request, response);
  const sendError = getThrowException(request, response);

  try {
    const body = await bodyParser.parse(request);
    const session = await sessionController.create(body);
    send(201, 'Created', null, {'Set-Cookie': `auth_token=${session}; HttpOnly;`})
  } catch (e) {
    sendError(e);
  }
};
