import { TestBed } from '@angular/core/testing';

// External libraries
import { Subject } from 'rxjs';

// Services
import { ElectronService } from '@core/electron/electron.service';
import { TitlebarService } from './titlebar.service';
// Service stubs
import { ElectronServiceStub } from '@core/electron/electron.service.stub';

// Classes and Interfaces
import { RendererAPIOnFn, RendererAPISendFn } from '@electron-app/preload';

describe('TitlebarService', () => {
	let service: TitlebarService;
	let electronService: ElectronService;

	const initService = () => {
		service = new TitlebarService(electronService);
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: ElectronService, useClass: ElectronServiceStub },
			],
		});
	});

	beforeEach(() => {
		electronService = TestBed.inject(ElectronService);
	});

	describe(`constructor`, () => {
		let timesCalled: number;
		let onSubject: Subject<string>;

		let onSpy: jasmine.Spy<RendererAPIOnFn>;

		const testOnSpyCalls = () => {
			expect(timesCalled).toBe(3);
			expect(onSpy.calls.allArgs()[0][0]).toEqual('window-maximize');
			expect(onSpy.calls.allArgs()[1][0]).toEqual('window-unmaximize');
			expect(onSpy).toHaveBeenCalledTimes(2);
		};

		beforeEach(() => {
			timesCalled = 0;
			onSubject = new Subject();

			onSpy = spyOn(electronService, 'on').and.callFake((channel, listener) => {
				onSubject.subscribe(testChannel => {
					if (testChannel === channel) {
						listener(null);
					}
				});
			});

			initService();
		});

		it('should be created', () => {
			expect(service).toBeTruthy();
		});

		it(`should emit to the #windowMaximized Observable when the 'window-maximize' event from the main process emits`, () => {
			service.windowMaximized.subscribe(() => {
				timesCalled++;
			});

			onSubject.next('window-maximize');
			onSubject.next('some-other-event');
			onSubject.next('window-maximize');
			onSubject.next('window-maximize');
			onSubject.next('window-unmaximize');
			testOnSpyCalls();
		});

		it(`should emit to the #windowUnmaximized Observable when the 'window-unmaximize' event from the main process emits`, () => {
			service.windowUnmaximized.subscribe(() => {
				timesCalled++;
			});

			onSubject.next('window-unmaximize');
			onSubject.next('some-other-event');
			onSubject.next('window-unmaximize');
			onSubject.next('window-unmaximize');
			onSubject.next('window-maximize');
			expect(timesCalled).toBe(3);
			expect(onSpy.calls.allArgs()[0][0]).toEqual('window-maximize');
			expect(onSpy.calls.allArgs()[1][0]).toEqual('window-unmaximize');
			expect(onSpy).toHaveBeenCalledTimes(2);
		});
	});

	describe(`sending events`, () => {
		let sendSpy: jasmine.Spy<RendererAPISendFn>;

		beforeEach(() => {
			sendSpy = spyOn(electronService, 'send');

			initService();
		});

		it(`#sendWindowMinimizeEvent should emit a window minimize event to the main process`, () => {
			service.sendWindowMinimizeEvent();
			expect(sendSpy).toHaveBeenCalledWith('execute-window-minimize');
		});

		it(`#sendWindowMaximizeEvent should emit a window minimize event to the main process`, () => {
			service.sendWindowMaximizeEvent();
			expect(sendSpy).toHaveBeenCalledWith('execute-window-maximize');
		});

		it(`#sendWindowRestoreEvent should emit a window minimize event to the main process`, () => {
			service.sendWindowRestoreEvent();
			expect(sendSpy).toHaveBeenCalledWith('execute-window-restore');
		});

		it(`#sendWindowCloseEvent should emit a window minimize event to the main process`, () => {
			service.sendWindowCloseEvent();
			expect(sendSpy).toHaveBeenCalledWith('execute-window-close');
		});
	});
});
