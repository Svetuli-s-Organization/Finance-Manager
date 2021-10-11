class IpcRendererStub {
	on() {}
	send() {}
}

export class ElectronServiceStub {
	ipcRenderer = new IpcRendererStub();
}
