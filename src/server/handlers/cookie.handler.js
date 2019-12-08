const getCookieHandler = (request, response) => callback => {
  try {
    const cookieStrings = request.headers['cookie'].split(';') || [];

    const cookies = cookieStrings.reduce((cookies, cookieString) => {
      const [key, value] = cookieString.split('=');

      cookies[key] = value;

      return cookies;
    }, {});

    callback(false, cookies)
  } catch (e) {
    callback(e, null)
  }
};

exports.getCookieHandler = getCookieHandler;
