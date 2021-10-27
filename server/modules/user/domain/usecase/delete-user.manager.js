class DeleteUserManager {
  constructor (userRepo) {
    this.userRepo = userRepo
  }

  async execute (userId) {
    const users = await this.userRepo.deleteUser(userId)

    users.map((user) => {
      delete user.password
      return user
    })

    return users
  }
}

module.exports = DeleteUserManager
