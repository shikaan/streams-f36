const {StatsController} = require("./stats.controller");
const {StatsService} = require("./stats.service");

const {getThrowException} = require("../_utils");

/**
 * Stats Module Initialization
 */
const statsService = new StatsService();
const statsController = new StatsController(statsService);

module.exports = (request, response) => {
  const sendError = getThrowException(request, response);
  const stream = statsController.getCPUDataStream();

  stream
    .pipe(response)
    .on('error', sendError)
};
