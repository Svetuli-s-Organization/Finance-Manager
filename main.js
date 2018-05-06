const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { template } = require('./menu.js');
const { openFile } = require('./menu.js');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1400,
    height: 900
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null;
  });

  const menu = Menu.buildFromTemplate(template(win));
  Menu.setApplicationMenu(menu);

  ipcMain.on('open-file', (e, arg) => {
    openFile(win);
  });
}

app.on('ready', createWindow);

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
