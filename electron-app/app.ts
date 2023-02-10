import { BrowserWindow, dialog, ipcMain, Menu } from 'electron';
import path from 'path';

// External libraries
import Store from 'electron-store';

// Classes and Interfaces
import { UserMetadata } from '../shared/types';

import { isProd } from './environment';

const metadataStore = new Store<UserMetadata>({
	name: 'metadata',
	fileExtension: 'fmnconf',
	encryptionKey: '21[1as0#6a2@7q3g4F}4s',
	defaults: {
		recentFilePaths: [],
	},
});

export const whenReady = () => {
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
		frame: false,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
			sandbox: false,
			nodeIntegration: true,
		},
		show: false,
	});

	if (isProd()) {
		console.log('PROD');
		win.loadFile(path.join(__dirname, './angular/index.html'));
	} else {
		console.log('DEV');
		// Logic for loading the welcome or the main screen
		win.loadURL('http://localhost:4200/welcome');
		win.webContents.toggleDevTools();
	}

	win.on('ready-to-show', () => {
		win.maximize();
	});

	try {
		handleRendererCommunication(win);
	} catch (err) {
		console.error('ERROR:', err);
	}

	// Build an empty menu because the menu is part of the renderer
	Menu.setApplicationMenu(null);
};

function handleRendererCommunication(win: BrowserWindow) {
	/**
	 * This is so that when the app's in dev mode and the angular app reloads,
	 * the event will be handled so that you don't have to restart the electron app.
	 */
	const ipcMainOnce: typeof ipcMain.once =
		isProd() ?
		ipcMain.once.bind(ipcMain) :
		ipcMain.on.bind(ipcMain);

	ipcMainOnce('renderer-ready', () => {
		win.webContents.send('window-maximize');

		win.on('maximize', () => {
			win.webContents.send('window-maximize');
		});

		win.on('unmaximize', () => {
			win.webContents.send('window-unmaximize');
		});
	});

	ipcMainOnce('user-service-ready', () => {
		win.webContents.send('user-metadata', metadataStore.store);
	});

	ipcMain.on('open-file', async () => {
		const value = await dialog.showOpenDialog(win, { properties: ['openFile'], filters: [{ name: 'Finance Manager File',  extensions: ['fmn'] }] });
		if (!value.canceled) {
			const file = value.filePaths[0];
			const recentFilePaths = metadataStore.get('recentFilePaths');
			const newRecentFilePaths = Array.from(new Set([file, ...recentFilePaths])).slice(0, 4);
			metadataStore.set('recentFilePaths', newRecentFilePaths);
			win.webContents.send('user-metadata', metadataStore.store);
		}
	});

	ipcMain.on('execute-window-minimize', () => {
		win.minimize();
	});

	ipcMain.on('execute-window-maximize', () => {
		win.maximize();
	});

	ipcMain.on('execute-window-restore', () => {
		win.restore();
	});

	ipcMain.on('execute-window-close', () => {
		win.close();
	});
}
