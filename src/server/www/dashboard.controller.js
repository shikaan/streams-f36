const {resolve, join} = require('path');
const {createReadStream} = require('fs');

class DashboardController {
  fetchIndex() {
    return createReadStream(join(DashboardController.DIST_PATH, 'index.html'))
  }
}

DashboardController.ROUTE_MATCHER = /dashboard/;
DashboardController.DIST_PATH = resolve(__dirname, '..', '..', '..', 'dist');

exports.DashboardController = DashboardController;
