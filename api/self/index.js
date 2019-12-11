const {SelfController} = require("./self.controller");
const {SelfService} = require("./self.service");
const {UsersRepository} = require("../users/users.repository");
const {User} = require("../users/users.model");

const {cookieParser, getSuccessHandler, getThrowException} = require("../_utils");
const {config} = require('../_config');

User.init(User.DEFINITIONS, {sequelize: config.database});
const usersRepository = new UsersRepository(User);
const selfService = new SelfService(usersRepository);
const selfController = new SelfController(selfService);

module.exports = async (request, response) => {
  const send = getSuccessHandler(request, response);
  const sendError = getThrowException(request, response);

  try {
    const cookies = await cookieParser.parse(request, response);
    const data = selfController.fetch(cookies['auth_token']);

    send(200, 'OK', JSON.stringify(data), {}, 'application/json');
  } catch (e) {
    sendError(e)
  }
};
