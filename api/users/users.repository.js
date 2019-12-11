class UsersRepository {
  constructor(model) {
    this.model = model;
  }

  findAll() {

  }

  findBy(key, value) {
    return this.model.findOne({where: {[key]: value}})
  }
}

exports.UsersRepository = UsersRepository;
