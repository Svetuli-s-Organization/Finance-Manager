import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	ipcRenderer: {
		on: <T>(channel: string, listener: (data: T) => void) => {
			ipcRenderer.on(channel, (_, data) => listener(data));
		},
		send: <T>(channel: string, data: T) => {
			ipcRenderer.send(channel, data);
		},
	}
});
