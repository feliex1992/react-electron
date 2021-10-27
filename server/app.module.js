const UserModule = require('./modules/user/user.module')

class AppModule {
  constructor () {
    this.registerModules()
  }

  registerModules () {
    new UserModule()
  }
}

module.exports = AppModule
