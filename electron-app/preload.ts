import { contextBridge, ipcRenderer } from 'electron';
import * as path from 'path';

export type RendererAPIOnFn = <T>(channel: string, listener: (data: T) => any) => any;
export type RendererAPISendFn = <T>(channel: string, data?: T) => any;
export interface RendererAPIPath {
	basename: (path: string, ext?: string) => string;
};

/**
 * An interface that describes the API that is exposed to the renderer process.
 */
export interface RendererAPI {
	/**
	 * Like the method `ipcRenderer.on`, but the listener function doesn't have the event
	 * object passed to it.
	 */
	on: RendererAPIOnFn;

	/**
	 * Like the method `ipcRenderer.send`, but accepts only 1 data argument.
	 */
	send: RendererAPISendFn;

	/**
	 * The nodejs `path` module.
	 */
	path: RendererAPIPath;
}

/**
 * An object that contains the API that is exposed to the renderer process.
 */
const rendererAPI: RendererAPI = {
	on: (channel, listener) => {
		ipcRenderer.on(channel, (_, data) => listener(data));
	},
	send: (channel, data) => {
		ipcRenderer.send(channel, data);
	},
	path: {
		basename: (p: string, ext?: string) => path.basename(p, ext),
	},
}

contextBridge.exposeInMainWorld('rendererAPI', rendererAPI);
