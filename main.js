const { app, BrowserWindow } = require('electron');

let win;

function createWindow(){
	// Create browser window
	win = new BrowserWindow({
		width: 1200,
		height: 800
	});

	win.loadURL(`file://${__dirname}/dist/index.html`);

	// Open Dev Tools
	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit();
	}
});
