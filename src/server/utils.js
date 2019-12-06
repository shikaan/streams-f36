const ROUTE_NAME = {
  READ: 'read',
  CURRENCY: 'currency',
  DASHBOARD: 'dashboard'
}

const getRouteHandlerByURL = (messageUrl) => {
  const readRouteMatcher = /read\/(.+)/i
  const currencyRouteMatcher = /currency\/(.+)/i
  const dashboardRouteMatcher = /dashboard/i

  if (readRouteMatcher.test(messageUrl)) {
    const [_match, parameter] = readRouteMatcher.exec(messageUrl)

    return {
      routeName: ROUTE_NAME.READ,
      parameters: [
        parameter
      ]
    }
  } else if (currencyRouteMatcher.test(messageUrl)) {
    const [_match, parameter] = currencyRouteMatcher.exec(messageUrl)

    return {
      routeName: ROUTE_NAME.CURRENCY,
      parameters: [
        parameter
      ]
    }
  } else if (dashboardRouteMatcher.test(messageUrl)) {
    return {
      routeName: ROUTE_NAME.DASHBOARD,
      parameters: []
    }
  }


  return {}
}

exports.getRouteHandlerByURL = getRouteHandlerByURL;
exports.ROUTE_NAME = ROUTE_NAME;
