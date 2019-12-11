exports.environment = {
  MYSQL_USERNAME: process.env.MYSQL_USERNAME,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  PORT: process.env.PORT || 1234,
  NODE_ENV: process.env.NODE_ENV || 'local'
};
