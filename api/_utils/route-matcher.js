const {NotFoundException} = require("../_exceptions");
const {MethodNotAllowedException} = require("../_exceptions");

class RouteMatcher {
  constructor(request, response, debug) {
    this.response = response;
    this.request = request;

    this.matched = false;
    this.log = debug ? debug.extend('RouteMatcher') : console.log;
  }

  async match(matcher, options, handlers) {
    const cleanUrl = this.request.url.replace('//', '/');
    const handler = handlers[this.request.method];
    const methods = Object.keys(handlers);

    this.log(`Hitting route ${matcher}`);

    if (this.matched) {
      this.log(`Already matched`);
      return;
    }

    if (options.exact) {
      this.log('Is exact');
      if (cleanUrl === matcher) {
        return await this.handleMatchedRoute(methods, handler);
      }
    } else {
      this.log('Is not exact');
      const regExpMather = new RegExp(matcher);

      if (regExpMather.test(cleanUrl)) {
        return await this.handleMatchedRoute(methods, handler);
      }
    }
  };

  handleMatchedRoute(methods, handler) {
    this.log('Has matched');
    this.matched = true;

    if (!methods.includes(this.request.method)) {
      this.log(`Method not allowed ${this.request.method}`);
      throw new MethodNotAllowedException()
    }

    if (!handler) {
      this.log(`Handler not found ${this.request.method}`);
      throw new NotFoundException()
    }

    return handler(this.request, this.response)
  }
}

exports.RouteMatcher = RouteMatcher;
