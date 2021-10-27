const Realm = require('realm')
const { schemasList } = require('../../base/data/entity/base.entity')

class RealmDatabase {
  constructor (dbName) {
    this.dbName = dbName
  }

  connect () {
    const realm = new Realm({
      path: this.dbName,
      schema: schemasList
    })

    return realm
  }
}

module.exports = RealmDatabase
