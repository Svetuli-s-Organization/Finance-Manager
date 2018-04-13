const { dialog } = require('electron');

module.exports.template = [
  {
    label: 'File',
    submenu: [
      { label: 'Open', click: () => openFile() },
      { label: 'Save' },
      { label: 'Save as' },
    ]
  }
]

function openFile() {
  dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ extensions: ['*'] }]});
}
