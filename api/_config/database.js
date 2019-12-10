const {Sequelize} = require("sequelize");
const {environment} = require('./environment');

exports.connection = new Sequelize(
  {
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    database: environment.MYSQL_DATABASE,
    host: environment.MYSQL_HOST,
    username: environment.MYSQL_USERNAME,
    password: environment.MYSQL_PASSWORD
  });
