// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem')
const menu = require('./menu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


ipcMain.on('new-item', (e, itemUrl) => {
  readItem(itemUrl, item => {
    e.sender.send('new-item-success', item)
  })
})

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  let state = windowStateKeeper({
    defaultHeight: 650,
    defaultWidth: 500
  })

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width, 
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  menu(mainWindow)

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('renderer/index.html')

  state.manage(mainWindow)

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
