const BaseModule = require('../../base/modules/base.module')
const UserRoutes = require('./infrastructure/user.routes')
const UserSchema = require('./domain/entity/user.schema')
const UserRepository = require('./data/user.repository')

class UserModule extends BaseModule {
  constructor () {
    super({
      routes: [
        new UserRoutes()
      ],
      schemas: [
        UserSchema
      ],
      repositories: [
        { userRepo: new UserRepository() }
      ]
    })
  }
}

module.exports = UserModule
