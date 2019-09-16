const {
  app,
  BrowserWindow
} = require('electron')

const path = require('path')

let win

const URL = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`

function createWindow() {
  win = new BrowserWindow({
    width: 1008,
    minWidth: 1008,
    height: 695,
    minHeight: 695,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true
    },
  })
  win.loadURL(URL)
  win.webContents.openDevTools()
  win.on('closed', () => (win = null));
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
