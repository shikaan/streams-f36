const {Readable} = require('stream');

class StatsController {
  /**
   * @param  {StatsService} service
   */
  constructor(service) {
    this.service = service;
    this.outputStream = new Readable({
      read(){}
    });
  }

  getCPUDataStream() {
    setInterval(async () => {
      this.outputStream.push(JSON.stringify(await this.service.fetchCurrentCPUData()))
    }, StatsController.REFRESH_RATE);

    return this.outputStream;
  }
}

StatsController.ROUTE_MATCHER = /stats/;
StatsController.REFRESH_RATE = 1000;

exports.StatsController = StatsController;
