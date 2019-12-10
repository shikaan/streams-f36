const getSuccessHandler = (request, response) => (status, message, body, headers, contentType = 'text/plain') => {

  if (headers) {
    for (const [header, content] of Object.entries(headers)) {
      response.setHeader(header, content);
    }
  }

  response.writeHead(status, message, {'Content-Type': contentType});
  response.write(body || `${status} - ${message}`);

  response.end()
};

exports.getSuccessHandler = getSuccessHandler;
