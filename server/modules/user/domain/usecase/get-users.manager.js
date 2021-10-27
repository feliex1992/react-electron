class GetUsersManager {
  constructor (userRepo) {
    this.userRepo = userRepo
  }

  async execute () {
    const users = await this.userRepo.getUsers()

    users.map((user) => {
      delete user.password
    })

    return users
  }
}

module.exports = GetUsersManager
