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

exports.openFile = function(win, filePath) {
  if(!filePath) {
    dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ name: 'Finance Manager File',  extensions: ['fmn'] }]}, (openedfilePath) => {
      if(openedfilePath) {
        fs.readFile(openedfilePath[0], 'utf-8', (err, data) => {
          updateFilePaths(openedfilePath[0]);
          win.webContents.send('open', data);
        });
      }
    });
  } else {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      updateFilePaths(filePath);
      win.webContents.send('open', data);
    });
  }
}

function updateFilePaths(filePath) {
  let updatedFilesPaths = userMetaDataStore.get('recentFilesPaths');
  updatedFilesPaths.forEach((updatedFilePath, index) => updatedFilePath == filePath ? updatedFilesPaths.splice(index, 1) : null);
  updatedFilesPaths.unshift(filePath);
  updatedFilesPaths = updatedFilesPaths.slice(0, 3);
  userMetaDataStore.set('recentFilesPaths', updatedFilesPaths);
}
