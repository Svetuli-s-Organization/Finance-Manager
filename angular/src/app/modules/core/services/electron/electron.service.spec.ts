import { TestBed } from '@angular/core/testing';

import { IpcRenderer } from 'electron';

// Services
import { WINDOW } from '@core/services/window/window.service';
import { ElectronService } from './electron.service';

// Utils
import { customMatchers } from '@utils/testing/jasmine-custom-matchers';

const ipcRendererStub: IpcRenderer = {
} as IpcRenderer;

class WindowStub {
	require(path: string) {
		if (path === 'electron') {
			return {
				ipcRenderer: ipcRendererStub,
			};
		}
	}
}

describe('ElectronService', () => {
	let service: ElectronService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: WINDOW, useClass: WindowStub },
			],
		});
	});

	beforeEach(() => {
		jasmine.addMatchers(customMatchers);

		service = TestBed.inject(ElectronService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set #ipcRenderer', () => {
		expect(service.ipcRenderer).toEqual(ipcRendererStub);
		expect(service.ipcRenderer).toShareReferenceWith(ipcRendererStub);
	});
});
