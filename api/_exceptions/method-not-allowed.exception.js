class MethodNotAllowedException extends Error {
  constructor(props) {
    super(props);

    this.statusCode = 405;
    this.statusMessage = 'Method not allowed'
  }
}

exports.MethodNotAllowedException = MethodNotAllowedException;
