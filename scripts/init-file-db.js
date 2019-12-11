const fs = require('fs');
const filename = 'file.txt';
const time = new Date();

const touch = (filename) => {
  try {
    fs.utimesSync(filename, time, time);
  } catch (err) {
    fs.closeSync(fs.openSync(filename, 'w'));
  }
};

touch('database.sqlite');
