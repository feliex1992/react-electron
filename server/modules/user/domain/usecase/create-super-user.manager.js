const bcrypt = require('bcryptjs')

class CreateSuperUserManager {
  constructor (userRepo) {
    this.userRepo = userRepo
  }

  async execute () {
    const salt = bcrypt.genSaltSync(10)
    const superUser = await this.userRepo.createUser({
      userId: 'admin',
      userName: 'admin',
      password: bcrypt.hashSync('admin', salt),
      level: 'own'
    })
    return superUser
  }
}

module.exports = CreateSuperUserManager
