import * as Electron from 'electron';

export {}

declare global {
	interface Window {
		electron: typeof Electron;
	}
}
