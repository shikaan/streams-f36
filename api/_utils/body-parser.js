/**
 * @param request
 * @returns {Promise<string>}
 */
const parse = (request) => new Promise((resolve, reject) => {
  const chunks = [];

  request
    .on('data', chunk => chunks.push(Buffer.from(chunk).toString('utf-8')))
    .on('error', reject)
    .on('end', () => {
      const formData = chunks.join();
      resolve(formData);
    })
});

exports.parse = parse;
