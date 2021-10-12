import { contextBridge, ipcRenderer } from 'electron';

export type RendererAPIOnFn = <T>(channel: string, listener: (data: T) => void) => void;
export type RendererAPISendFn = <T>(channel: string, data?: T) => void;

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
}

contextBridge.exposeInMainWorld('rendererAPI', rendererAPI);
