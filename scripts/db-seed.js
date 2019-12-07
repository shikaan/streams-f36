const {Sequelize} = require('sequelize');
const {User} = require('../src/server/api/users/users.model');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/data.db'
});

User.init(User.DEFINITIONS, {sequelize, modelName: 'user'});

sequelize.sync()
  .then(() => User.create({
    username: 'manuel',
    password: 'password'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
