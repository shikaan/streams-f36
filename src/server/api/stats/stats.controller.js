const {Readable} = require('stream');

class StatsController {
  /**
   * @param  {StatsService} service
   */
  constructor(service) {
    this.service = service;
    this.outputStream = new Readable({
      read() {
      }
    });
  }

  getCPUDataStream() {
    let lastData = null;
    setInterval(async () => {
      const metadata = {date: new Date().toISOString()};
      const newData = await this.service.fetchCurrentCPUData();

      const data = {};

      if (lastData) {
        for (const [label, item] of Object.entries(newData)) {
          data[label] = {
            ...item,
            percentage: item.getPercentage(lastData[label]),
            idle: item.getIdle(),
            nonIdle: item.getNonIdle()
          }
        }

        this.outputStream.push(JSON.stringify({data, metadata}))
      }
      lastData = newData;
    }, StatsController.REFRESH_RATE);

    return this.outputStream;
  }
}

StatsController.ROUTE_MATCHER = /api\/stats/;
StatsController.REFRESH_RATE = 2000;

exports.StatsController = StatsController;
