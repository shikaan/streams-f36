const assert = require('assert');
const {Readable} = require('stream');

const {StatsService} = require("./stats.service");

suite('StatsService#fetchCurrentCPUData', () => {
  spec('exists', () => {
    const instance = new StatsService();

    assert.ok(!!instance.fetchCurrentCPUData)
  });

  spec('line handler picks CPU lines', async () => {
    const instance = new StatsService();
    const procStatStream = new Readable();
    procStatStream._read = () => `cpu 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1`;

    await instance.fetchCurrentCPUData(procStatStream).then(console.log);
  });

  xspec('line handler does not pick non-CPU lines', () => {

  })
});
