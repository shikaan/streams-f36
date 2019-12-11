const {User} = require('../api/users/users.model');
const {config} = require('../api/_config');

const sequelize = config.database;

User.init(User.DEFINITIONS, {sequelize, modelName: 'user'});

sequelize.sync()
  .then(() => User.create({
    username: 'manuel',
    password: 'password'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
