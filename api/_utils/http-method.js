const {METHODS} = require('http');

module.exports.HTTP_METHOD = METHODS.reduce((acc, i) => {
  acc[i] = i;
  return acc
}, {});
