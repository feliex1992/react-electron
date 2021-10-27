const { app, BrowserWindow } = require('electron')
const path = require('path')

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

function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // win.removeMenu(true)
  win.maximize()

  win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
