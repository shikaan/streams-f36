const {resolve, join} = require('path');
const {createReadStream, access, constants} = require('fs');
const {promisify} = require('util');

const asyncAccess = promisify(access);

class StaticController {
  async fetch(resource) {
    const filePath = join(StaticController.STATIC_PATH, resource);
    /**
     * @throws ENOENT
'     */
    await asyncAccess(filePath);

    return createReadStream(filePath)
  }
}

StaticController.ROUTE_MATCHER = /.+/;
StaticController.STATIC_PATH = resolve(__dirname, '..', '..', '..', 'dist');

exports.StaticController = StaticController;
