const fallback = require('express-history-api-fallback')
const express = require('express')
const appExpress = express()
const root = `${__dirname}/client`

const Server = require('./server')

new Server().generateServer(appExpress)

appExpress.use(express.static(root))
appExpress.use(fallback('index.html', { root }))

const port = process.env.PORT || 3000
appExpress.listen(port, () => console.log(`Listening on port ${port}`))
