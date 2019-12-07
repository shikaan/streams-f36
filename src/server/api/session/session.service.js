const jwt = require('jsonwebtoken');

class SessionService {
  /**
   * @param {UsersRepository} repository
   */
  constructor(repository) {
    this.usersRepository = repository;
  }

  async create(username, password) {
    const {dataValues: user} = await this.usersRepository.findBy('username', username);

    if (user.password !== password) {
      throw Object.assign(new Error('Invalid credentials'), {statusCode: 401})
    }

    return jwt.sign({sub: user.id, username}, SessionService.SECRET)
  }
}

SessionService.SECRET = process.env.JWT_SECRET || 'secret';

exports.SessionService = SessionService;
