const {connection} = require('./database');
const {environment} = require('./environment');

exports.config = {
  database: connection,
  environment
};
