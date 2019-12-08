class SelfService {
  /**
   * @param {UsersRepository} usersRepository
   */
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  fetch(sub) {
    return this.usersRepository.findBy('id', sub);
  }
}

exports.SelfService = SelfService;
