const { dialog } = require('electron');
const fs = require('fs');
const Store = require('./store.js');

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 }
  }
});

exports.template = function(window) {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'Open', click: () => exports.openFile(window) },
        { label: 'Save' },
        { label: 'Save as' },
      ]
    }
  ];

  if(process.env.NODE_ENV !== 'production') {
    template.push({
      label: 'Developer tools',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: 'Ctrl+I',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      ]
    })
  }

  return template;
}

exports.openFile = function(win) {
  dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ name: 'Finance Manager File',  extensions: ['fmn'] }]}, (filePath) => {
    if(filePath) {
      fs.readFile(filePath[0], 'utf-8', (err, data) => {
        store.set('recentFilePath', filePath[0]);
        win.webContents.send('open', data);
      });
    }
  });
}
