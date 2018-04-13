const { dialog } = require('electron');
const fs = require('fs');

module.exports = function(window) {
  return [
    {
      label: 'File',
      submenu: [
        { label: 'Open', click: () => openFile(window) },
        { label: 'Save' },
        { label: 'Save as' },
      ]
    }
  ];
}

function openFile(win) {
  dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ name: 'Finance Manager File',  extensions: ['fmn'] }]}, (filePath) => {
    if(filePath) {
      fs.readFile(filePath[0], 'utf-8', (err, data) => {
        win.webContents.send('open', data);
      });
    }
  });
}
