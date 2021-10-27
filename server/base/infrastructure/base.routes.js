class BaseRoutes {
  constructor (controllerClass) {
    this.routes = []
    this.ControllerClass = controllerClass
  }

  buildRoute (uri, httpMethod, action, isSecure = false) {
    this.routes.push({
      controllerClass: this.ControllerClass,
      uri,
      httpMethod,
      action,
      isSecure
    })
  }
}

module.exports = BaseRoutes
