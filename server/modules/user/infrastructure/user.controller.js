const BaseController = require('../../../base/infrastructure/base.controller')

const CreateSuperUser = require('../domain/usecase/create-super-user.manager')
const CreateUserManager = require('../domain/usecase/create-user.manager')
const GetUsersManager = require('../domain/usecase/get-users.manager')
const LoginUserManager = require('../domain/usecase/login-user.manager')
const DeleteUserManager = require('../domain/usecase/delete-user.manager')

class UserController extends BaseController {
  async getUsers () {
    try {
      this.success(await new GetUsersManager(this.repository.userRepo).execute())
    } catch (err) {
      this.error(err)
    }
  }

  async createSuperUser () {
    try {
      this.success(await new CreateSuperUser(this.repository.userRepo).execute())
    } catch (err) {
      this.error(err)
    }
  }

  async createUser () {
    try {
      this.success(await new CreateUserManager(this.repository.userRepo).execute(this.body))
    } catch (err) {
      this.error(err)
    }
  }

  async userLogin () {
    try {
      this.success(await new LoginUserManager(this.repository.userRepo).execute(this.body))
    } catch (err) {
      this.error(err)
    }
  }

  async deleteUser () {
    try {
      this.success(await new DeleteUserManager(this.repository.userRepo).execute(this.params.userId))
    } catch (err) {
      this.error(err)
    }
  }
}

module.exports = UserController
