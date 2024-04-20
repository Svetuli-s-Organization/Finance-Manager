export class ElectronServiceStub {
	on() { }
	send() { }
}

export interface ElectronServiceStubInterface {
	on: () => any;
	send: (channel: string, data?: unknown) => any;
}

export const getElectronServiceSpy = () => jasmine.createSpyObj<ElectronServiceStubInterface>('electronServiceSpy', {
	on: () => { },
	send: () => { },
});
