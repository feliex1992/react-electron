const BaseRoutes = require('../../../base/infrastructure/base.routes')
const UserController = require('./user.controller')

class UserRoutes extends BaseRoutes {
  constructor () {
    super(UserController)
  }

  getRoutes () {
    this.buildRoute('/users', 'get', 'getUsers')
    this.buildRoute('/user', 'post', 'createUser')
    this.buildRoute('/user/super', 'post', 'createSuperUser')
    this.buildRoute('/user/login', 'post', 'userLogin')
    this.buildRoute('/user/:userId', 'delete', 'deleteUser')

    return this.routes
  }
}

module.exports = UserRoutes
