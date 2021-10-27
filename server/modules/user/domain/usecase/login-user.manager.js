const bcrypt = require('bcryptjs')

class LoginUserManager {
  constructor (userRepo) {
    this.userRepo = userRepo
  }

  async execute (body) {
    const { userId, password } = body

    const users = await this.userRepo.getUserByUserId(userId)
    if (bcrypt.compareSync(password, users[0].password)) {
      return {
        accessToken: 'Secret Token',
        name: users[0].userName
      }
    }

    return 'User id atau password salah!'
  }
}

module.exports = LoginUserManager
