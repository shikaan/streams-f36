const getBodyParser = (request) => callback => {
  const chunks = [];

  request
    .on('data', chunk => chunks.push(Buffer.from(chunk).toString('utf-8')))
    .on('error', callback)
    .on('end', () => {
      const formData = chunks.join();
      callback(false, formData);
    })
};

exports.getBodyParser = getBodyParser;
