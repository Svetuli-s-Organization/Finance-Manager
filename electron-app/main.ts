import { app } from 'electron';

// External libraries
import sourceMapSupport from 'source-map-support';
import dotenv from 'dotenv';
import updater from 'update-electron-app';

import { isProd } from './environment';
import { whenReady } from './app';

if (!isProd()) {
	sourceMapSupport.install();
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

dotenv.config();
updater();

app.whenReady().then(() => whenReady());
