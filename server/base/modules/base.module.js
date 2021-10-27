const { routesList, schemasList, repositoriesList } = require('../../base/data/entity/base.entity')

class BaseModule {
  constructor ({ routes, schemas, repositories }) {
    routesList.push(...routes)
    schemasList.push(...schemas)

    repositoriesList.push(...repositories)
  }
}

module.exports = BaseModule
