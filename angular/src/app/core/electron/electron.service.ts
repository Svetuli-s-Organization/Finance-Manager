import { Injectable, Inject } from '@angular/core';

// Services
import { WINDOW } from '@core/window/window.service';
import { RendererAPI, RendererAPIOnFn, RendererAPISendFn } from '@electron-app/preload';

@Injectable({
	providedIn: 'root'
})
export class ElectronService {

	on: RendererAPIOnFn;
	send: RendererAPISendFn;

	ipcRenderer = {
		on: (channel, listener) => {},
		send: (channel, data?) => {},
	};

	constructor(@Inject(WINDOW) private window: Window) {
		const { on, send } = this.window.rendererAPI;
		this.on = on;
		this.send = send;

		this.send('renderer-ready');
	}
}
