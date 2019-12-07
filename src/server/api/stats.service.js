const {createReadStream} = require('fs');
const {createInterface} = require('readline');

const {Stats} = require("./stats.model");

class StatsService {
  fetchCurrentCPUData() {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(`/proc/stat`, {autoClose: true, encoding: 'utf-8', flags: 'rs'});

      const readLine = createInterface({
        input: readStream
      });

      const cpuData = {};

      readLine
        .on('line', line => {
          const isCPULine = (/^cpu(\d+)/).test(line);

          if (isCPULine) {
            const [label, ...params] = line.split(/\s/);
            const parsedParams = params.map(i => Number.parseInt(i, 10));

            cpuData[label] = new Stats(...parsedParams);
          }
        })
        .on('error', reject)
        .on('close', () => {
          resolve(cpuData);
        })
    })
  }
}

exports.StatsService = StatsService;
