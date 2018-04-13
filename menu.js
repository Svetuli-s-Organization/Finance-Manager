const { dialog } = require('electron');
const fs = require('fs');

module.exports = function(window) {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'Open', click: () => openFile(window) },
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

function openFile(win) {
  dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ name: 'Finance Manager File',  extensions: ['fmn'] }]}, (filePath) => {
    if(filePath) {
      fs.readFile(filePath[0], 'utf-8', (err, data) => {
        win.webContents.send('open', data);
      });
    }
  });
}
