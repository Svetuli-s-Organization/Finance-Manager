import { TestBed } from '@angular/core/testing';

import { IpcRenderer, IpcRendererEvent } from 'electron';

// External libraries
import { configureTestSuite } from 'ng-bullet';

// Services
import { UserService } from './user.service';
import { ElectronService } from '@core/services/electron/electron.service';

// Service stubs
import { ElectronServiceStub } from '@core/services/electron/electron.service.stub';
import { UserMetadata } from '@app/structures/user';

describe('UserService', () => {
	let service: UserService;
	let electronService: ElectronService;

	const initService = () => {
		electronService = TestBed.inject(ElectronService);
		service = new UserService(electronService);
	};

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: ElectronService, useClass: ElectronServiceStub },
			],
		});
	});

	it('should be created', () => {
		initService();
		expect(service).toBeTruthy();
	});

	describe(`constructor`, () => {
		type ListenerFunction = (event: IpcRendererEvent, ...args: any[]) => void;
		let sendSpy: jasmine.Spy<(channel: string, ...args: any[]) => void>;
		let onSpy: jasmine.Spy<(channel: string, listener: ListenerFunction) => IpcRenderer>;

		const mockMetadata: UserMetadata = {
			recentFilePaths: [
				'file-path-1',
				'file-path-2',
			],
		};

		beforeEach(() => {
			initService();

			sendSpy = spyOn(electronService.ipcRenderer, 'send');
			onSpy = spyOn(electronService.ipcRenderer, 'on').and.callFake((channel: string, listener: ListenerFunction) => {
				listener({} as IpcRendererEvent, mockMetadata);
				return {} as IpcRenderer;
			});
		});

		it(`should retrieve the user metadata from the electron ipc and push it to the #userMetadata stream`, (done => {
			initService();

			service.userMetadata.subscribe(metaData => {
				expect(metaData).toEqual(mockMetadata);
				done();
			});
			expect(onSpy.calls.allArgs()[0][0]).toEqual('user-metadata');
			expect(onSpy).toHaveBeenCalledTimes(1);
		}));

		it(`should send event to channel "user-service-ready" using the IpcRenderer`, () => {
			initService();
			expect(sendSpy).toHaveBeenCalledWith('user-service-ready');
			expect(sendSpy).toHaveBeenCalledTimes(1);
		});
	});
});
