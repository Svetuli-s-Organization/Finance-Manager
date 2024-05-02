import { RendererAPIOnFn } from "@electron-app/preload";

export class ElectronServiceStub {
	on() { }
	send() { }
}

export interface ElectronServiceStubInterface {
	on: RendererAPIOnFn;
	send: (channel: string, data?: unknown) => any;
}

export type ListenerFunction = (data: any) => void;

export const getElectronServiceSpy = () => jasmine.createSpyObj<ElectronServiceStubInterface>('electronServiceSpy', {
	on: () => { },
	send: () => { },
});
