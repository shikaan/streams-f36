class NotFoundException extends Error {
  constructor(props) {
    super(props);

    this.statusCode = 404;
    this.statusMessage = 'Not Found'
  }
}

exports.NotFoundException = NotFoundException
