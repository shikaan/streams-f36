const {parse} = require('querystring');

class SessionController {
  /**
   * @param {SessionService} service
   */
  constructor(service) {
    this.service = service;
  }

  create(formData) {
    const {username, password} = parse(formData);

    if (!username) {
      throw Object.assign(new Error('Missing Username'), {statusCode: 422});
    }

    if (!password) {
      throw Object.assign(new Error('Missing Password'), {statusCode: 422});
    }

    return this.service.create(username, password);
  }
}

SessionController.ROUTE_MATCHER = /session/;

exports.SessionController = SessionController;
