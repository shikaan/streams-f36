const parse = (request, response) => new Promise((resolve, reject) => {
  try {
    const cookieStrings = request.headers['cookie'].split(';') || [];

    const cookies = cookieStrings.reduce((cookies, cookieString) => {
      const [key, value] = cookieString.split('=');

      cookies[key] = value;

      return cookies;
    }, {});

    resolve(cookies)
  } catch (e) {
    reject(e)
  }
});

exports.parse = parse;
