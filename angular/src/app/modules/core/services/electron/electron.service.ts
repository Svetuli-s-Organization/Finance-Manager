import { Injectable, Inject } from '@angular/core';

// External libraries
import { IpcRenderer } from 'electron';

// Services
import { WINDOW } from '@core/services/window/window.service';

@Injectable({
	providedIn: 'root'
})
export class ElectronService {

	ipcRenderer: IpcRenderer;

	constructor(@Inject(WINDOW) private window: Window) {
		this.ipcRenderer = this.window.require('electron').ipcRenderer;
	}
}
