import { app, BrowserWindow } from 'electron';

import * as path from 'path';

app.whenReady().then(() => {
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		}
	});

	win.loadURL('http://localhost:4200');
	win.maximize();

	win.webContents.toggleDevTools();
});

app.allowRendererProcessReuse = true;
