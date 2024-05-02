import { TestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';

// Services
import { UserService } from './user.service';
import { ElectronService } from '@core/electron/electron.service';
// Service stubs
import { ElectronServiceStub, ListenerFunction } from '@core/electron/electron.service.stub';

// Classes and Interfaces
import { RendererAPIOnFn, RendererAPISendFn } from '@electron-app/preload';
import { UserMetadata } from '@root/shared/types';

// Utils
import { NgZoneStub } from '@utils/testing/zone.stub';

describe('UserService', () => {
	let service: UserService;
	let zone: NgZone;
	let electronService: ElectronService;

	const initService = () => {
		zone = new NgZoneStub() as NgZone;
		electronService = TestBed.inject(ElectronService);
		service = new UserService(zone, electronService);
	};

	beforeEach(() => {
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
		let sendSpy: jasmine.Spy<RendererAPISendFn>;
		let onSpy: jasmine.Spy<RendererAPIOnFn>;

		const mockMetadata: UserMetadata = {
			recentFilePaths: [
				'file-path-1',
				'file-path-2',
			],
		};

		beforeEach(() => {
			initService();

			sendSpy = spyOn(electronService, 'send');
			onSpy = spyOn(electronService, 'on').and.callFake((_, listener: ListenerFunction) => {
				listener(mockMetadata);
			});
		});

		it(`should retrieve the user metadata from the electron ipc and push it to the #userMetadata stream`, () => {
			initService();

			service.userMetadata.subscribe(metaData => {
				expect(metaData).toEqual(mockMetadata);
			});
			expect(onSpy.calls.allArgs()[0][0]).toEqual('user-metadata');
			expect(onSpy).toHaveBeenCalledTimes(1);
		});

		it(`should send event to channel "user-service-ready" using the ElectronService`, () => {
			initService();
			expect(sendSpy).toHaveBeenCalledWith('user-service-ready');
			expect(sendSpy).toHaveBeenCalledTimes(1);
		});
	});
});
