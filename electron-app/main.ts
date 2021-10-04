import { app, BrowserWindow } from 'electron';
import dotenv from 'dotenv';
import updater from 'update-electron-app';

import path from 'path';

import { isProd } from './environment';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

dotenv.config();
updater();

app.whenReady().then(() => {
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
		frame:  true,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		}
	});

	if (isProd()) {
		console.log('PROD');
		win.loadFile(path.join(__dirname, './angular/index.html'));
	} else {
		console.log('DEV');
		win.loadURL('http://localhost:4200');
		win.webContents.toggleDevTools();
	}

	win.maximize();
});
