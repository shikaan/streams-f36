const {StatsController} = require("./stats/stats.controller");
const {StatsService} = require("./stats/stats.service");

const {getThrowException} = require("./_utils");

/**
 * Stats Module Initialization
 */
const statsService = new StatsService();
const statsController = new StatsController(statsService);

module.exports = (request, response) => {
  const sendError = getThrowException(request, response);
  const stream = statsController.getCPUDataStream();

  response.setHeader('content-type', 'application/octet-stream');

  stream.pipe(response)
};
