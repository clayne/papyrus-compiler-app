import { app, BrowserWindow } from 'electron'
import { Initialize } from './src/initialize'

let win: BrowserWindow

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 820,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    show: false
  })

  win.loadURL('http://localhost:4200')
  win.webContents.openDevTools({ mode: 'bottom' })
  Initialize.main()

  win.on('closed', () => {
    win = null
  })

  win.on('ready-to-show', () => {
    win.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
