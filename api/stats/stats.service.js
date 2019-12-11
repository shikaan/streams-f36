const {createReadStream} = require('fs');
const {createInterface} = require('readline');

const {Stats} = require("./stats.model");

class StatsService {
  /**
   * @param {ReadStream} procStatStream
   * @returns {Promise<{string: Stats}>}
   */
  fetchCurrentCPUData(procStatStream = this.getProcStatStream()) {
    return new Promise((resolve, reject) => {
      const readLine = createInterface({
        input: procStatStream
      });

      const cpuData = {};

      readLine
        .on('line', this.getLineHandler(cpuData))
        .on('error', reject)
        .on('close', () => {
          resolve(cpuData);
        })
    })
  }

  /**
   * @private
   * @param cpuData
   * @returns {function(...[*]=)}
   */
  getLineHandler(cpuData) {
    return line => {
      const isCPULine = (/^cpu(\d+)/).test(line);

      if (isCPULine) {
        const [label, ...params] = line.split(/\s/);
        const parsedParams = params.map(i => Number.parseInt(i, 10));

        cpuData[label] = new Stats(...parsedParams);
      }
    };
  }

  /**
   * @private
   * @returns {ReadStream}
   */
  getProcStatStream() {
    return createReadStream(`/proc/stat`, {autoClose: true, encoding: 'utf-8', flags: 'rs'});
  }
}

exports.StatsService = StatsService;
