import { Injectable, Inject } from '@angular/core';

// Services
import { WINDOW } from '@core/window/window.service';
import { RendererAPIOnFn, RendererAPISendFn } from '@electron-app/preload';

@Injectable({
	providedIn: 'root'
})
export class ElectronService {

	on: RendererAPIOnFn;
	send: RendererAPISendFn;

	constructor(@Inject(WINDOW) private window: Window) {
		this.on = this.window.rendererAPI.on;
		this.send = this.window.rendererAPI.send;

		this.send('renderer-ready');
	}
}
