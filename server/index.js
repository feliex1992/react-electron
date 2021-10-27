const express = require('express')
const cors = require('cors')

const AppModule = require('./app.module')
const RealmDatabase = require('./utils/database/realm.database')
const UtilSecurity = require('./utils/security/util.security')
const UtilRouter = require('./utils/routes/util.routes')
const URIGenerator = require('./utils/routes/uri.generator')
const UtilsRepository = require('./utils/database/utils.repository')
const { repositoriesList } = require('./base/data/entity/base.entity')

class Server {
  constructor () {
    new AppModule()
    this.expressRouter = express.Router()
    this.router = new UtilRouter()
    this.security = new UtilSecurity()
    this.repository = repositoriesList.reduce((result, current) => {
      return Object.assign(result, current)
    })

    this._registerRoute = this._registerRoute.bind(this)
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this)
  }

  _registerRoute (uri, httpMethod, boundAction) {
    this.expressRouter.route(uri)[httpMethod](boundAction)
  }

  _createRouteBoundAction (controllerClass, method, isSecure) {
    const result = [
      (req, res) => {
        this._buildControllerInstance(controllerClass, req, res)[method]()
      }]

    if (isSecure) {
      result.unshift(
        this.security.authenticate()
      )
    }

    return result
  }

  _buildControllerInstance (ControllerClass, req, res) {
    return new ControllerClass(
      {
        params: req.params,
        query: req.query,
        headers: req.headers,
        body: req.body,
        repository: this.repository,
        uriGenerator: new URIGenerator(),
        send: (statusCode, resource, location) => {
          if (location) {
            res.location(location)
          }
          res.status(statusCode).send(resource)
        }
      }
    )
  }

  generateServer (app) {
    app.use(express.json({ limit: '30mb' }))
    app.use(express.urlencoded({ limit: '30mb', extended: true }))

    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token')
      next()
    })
    app.use(cors())

    const realm = new RealmDatabase('dbApp').connect()
    new UtilsRepository(realm).registerRepositories()

    this.router.registerRoutes(this._registerRoute, this._createRouteBoundAction)
    app.use('/api/v1', this.expressRouter)
  }
}

module.exports = Server
