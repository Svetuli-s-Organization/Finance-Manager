const { dialog } = require('electron');
const fs = require('fs');
const Store = require('./store.js');

const { userPreferencesStore, userMetaDataStore } = require('./stores');

exports.template = function(window) {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'New File' },
        { label: 'Open File', click: () => exports.openFile(window) },
        { label: 'Save' },
        { label: 'Save As' },
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
        let updatedFilesPaths = userMetaDataStore.get('recentFilesPaths');
        updatedFilesPaths.forEach((updatedFilePath, index) => updatedFilePath == filePath[0] ? updatedFilesPaths.splice(index, 1) : null);
        updatedFilesPaths.unshift(filePath[0]);
        updatedFilesPaths = updatedFilesPaths.slice(0, 3);
        userMetaDataStore.set('recentFilesPaths', updatedFilesPaths);

        win.webContents.send('open', data);
      });
    }
  });
}
