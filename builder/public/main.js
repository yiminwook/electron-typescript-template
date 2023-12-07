const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: isDev,
    },
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`);

  if (isDev) {
    //개발자 도구를 분리해서 실행
    mainWindow.webContents.openDevTools({ mode: 'detach' });

    //콘솔로그를 터미널에 표시
    mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
      console.log(`${message} ${sourceId} (${line})`);
    });

    console.log('Electron app start!!!');
  }

  mainWindow.setResizable(true);
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.focus();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }

  if (isDev) {
    console.log('Electron app closed!!!');
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
