const BaseRepository = require('../../../base/data/base.repository')
const UserSchema = require('../domain/entity/user.schema')

class UserRepository extends BaseRepository {
  async getUsers () {
    const users = JSON.stringify(await this.realm.objects(UserSchema.name))
    return JSON.parse(users)
  }

  async getUserByUserId (userId) {
    const users = JSON.stringify(await this.realm.objects(UserSchema.name).filtered(`userId = "${userId}"`))
    return JSON.parse(users)
  }

  async createUser (user) {
    let superUser
    this.realm.write(() => {
      superUser = JSON.stringify(this.realm.create(UserSchema.name, user))
    })
    return JSON.parse(superUser)
  }

  async deleteUser (userId) {
    const users = this.realm.objects(UserSchema.name).filtered(`userId = "${userId}"`)
    const result = JSON.stringify(users)

    this.realm.write(() => {
      this.realm.delete(users[0])
    })

    return JSON.parse(result)
  }
}

module.exports = UserRepository
