import { app, BrowserWindow } from 'electron';

app.whenReady().then(() => {
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
	});

	win.loadURL('http://localhost:4200');
	
	win.webContents.toggleDevTools();
});

app.allowRendererProcessReuse = true;
