const bcrypt = require('bcryptjs')

class CreateUserManager {
  constructor (userRepo) {
    this.userRepo = userRepo
  }

  async execute (user) {
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(user.password, salt)

    const result = await this.userRepo.createUser(user)
    delete result.password
    return result
  }
}

module.exports = CreateUserManager
