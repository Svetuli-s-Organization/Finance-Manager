const { dialog } = require('electron');
const fs = require('fs');
const Store = require('./store.js');

const { version } = require('./package.json');
const { userPreferencesStore, userMetaDataStore } = require('./stores');

exports.template = function(window) {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'New File', click: () => exports.createFile(window) },
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
    });
  }

  return template;
};

exports.openFile = function(win, filePath) {
  if(!filePath) {
    dialog.showOpenDialog(win, { properties: ['openFile'], filters: [{ name: 'Finance Manager File',  extensions: ['fmn'] }] }, (openedFilePath) => {
      if(openedFilePath) {
        fs.readFile(openedFilePath[0], 'utf-8', (err, data) => {
          updateFilePaths(openedFilePath[0]);
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
};

exports.createFile = function(win) {
  dialog.showSaveDialog(win, { filters: [{ name: 'Finance Manager File', extensions: ['fmn'] }] }, (savedFilePath) => {
    const basicFile = {
      metaData: {
        appVersion: version,
        dateCreated: new Date(),
        dateModified: new Date()
      }
    };

    fs.writeFile(savedFilePath, JSON.stringify(basicFile), function(err) {
      if(err) {
        return console.log(err);
      }

      updateFilePaths(savedFilePath);
      win.webContents.send('open', JSON.stringify(basicFile));
    });
  });
};

function updateFilePaths(filePath) {
  let updatedFilesPaths = userMetaDataStore.get('recentFilesPaths');
  updatedFilesPaths.forEach((updatedFilePath, index) => updatedFilePath == filePath ? updatedFilesPaths.splice(index, 1) : null);
  updatedFilesPaths.unshift(filePath);
  updatedFilesPaths = updatedFilesPaths.slice(0, 3);
  userMetaDataStore.set('recentFilesPaths', updatedFilesPaths);
}
