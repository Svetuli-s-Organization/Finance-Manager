import { Injectable, Inject } from '@angular/core';

// External libraries
import { IpcRenderer } from 'electron';

// Services
import { WINDOW } from '@core/window/window.service';

@Injectable({
	providedIn: 'root'
})
export class ElectronService {

	ipcRenderer: IpcRenderer;

	constructor(@Inject(WINDOW) private window: Window) {
		const { ipcRenderer } = this.window.electron;
		this.ipcRenderer = ipcRenderer;
		this.ipcRenderer.send('renderer-ready');
	}
}
