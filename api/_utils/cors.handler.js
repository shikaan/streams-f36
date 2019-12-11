const {getSuccessHandler} = require("./success.handler");

const cors = ({allowed = false}) => (request, response) => {
  const send = getSuccessHandler(request, response);

  if (allowed) {
    // ALLOW CORS
    if (request.headers.origin) {
      response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
      response.setHeader('Access-Control-Allow-Credentials', true);
    }

    if (request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
      response.setHeader('Access-Control-Allow-Methods', 'POST');

      return send(204)
    }
  }
};

exports.cors = cors;
