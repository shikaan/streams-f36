const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const asyncVerify = promisify(jwt.verify);

class SelfController {
  /**
   * @param {SelfService} service
   */
  constructor(service) {
    this.service = service
  }

  async fetch(token) {
    const {sub} = await asyncVerify(token, SelfController.SECRET, {});
    return this.service.fetch(sub);
  }
}

SelfController.ROUTE_MATCHER = /api(\/+)self/;
SelfController.SECRET = process.env.JWT_SECRET || 'secret';

exports.SelfController = SelfController;
