const { repositoriesList } = require('../../base/data/entity/base.entity')

class UtilsRepository {
  constructor (realm) {
    this.realm = realm
  }

  registerRepositories () {
    repositoriesList.map((repository) => {
      const key = Object.keys(repository)
      repository[key].setDb(this.realm)
    })
    this.repository = repositoriesList
  }
}

module.exports = UtilsRepository
