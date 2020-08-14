import { app, BrowserWindow } from 'electron'
import path from 'path'
import { initialize } from './src/initialize'
import { registerMenus } from './src/register-menus'

let win: BrowserWindow | null = null

function createWindow() {
  const mainUrl = process.env.REACT_APP_MAIN

  win = new BrowserWindow({
    width: 800,
    height: 820,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    },
    show: false
  })

  if (mainUrl) {
    win.loadURL(mainUrl)
  } else {
    win.loadFile(path.resolve(__dirname, 'index.html'))
  }

  if (mainUrl) {
    win.webContents.openDevTools({ mode: 'bottom' })
  }

  initialize()

  win.on('closed', () => {
    win = null
  })

  win.on('ready-to-show', () => {
    win!.show()
  })

  registerMenus({
    openLogFile: () => {
      win?.webContents.send('open-log-file')
    }
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
