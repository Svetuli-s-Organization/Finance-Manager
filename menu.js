const { dialog } = require('electron');
const fs = require('fs');
const Store = require('./store.js');

const userPreferencesStore = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 }
  }
});

const userMetaDataStore = new Store({
  configName: 'user-metadata',
  defaults: {
    recentFilesPaths: []
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
        if(!userMetaDataStore.get('recentFilesPaths').find(recentFilePath => recentFilePath == filePath[0])) {
          let updatedFilesPaths = userMetaDataStore.get('recentFilesPaths');
          updatedFilesPaths.unshift(filePath[0]);
          updatedFilesPaths = updatedFilesPaths.slice(0, 3);
          userMetaDataStore.set('recentFilesPaths', updatedFilesPaths);
        }
        win.webContents.send('open', data);
      });
    }
  });
}
