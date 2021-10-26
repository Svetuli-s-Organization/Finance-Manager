import { TestBed } from '@angular/core/testing';

// Services
import { WINDOW } from '@core/window/window.service';
import { ElectronService } from './electron.service';
// Service Stubs
import { WindowStub } from '@core/window/window.stub';

// Utils
import { customMatchers } from '@utils/testing/jasmine-custom-matchers';

describe('ElectronService', () => {
	let service: ElectronService;
	let window: Window;

	const initService = () => {
		service = new ElectronService(window);
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: WINDOW, useClass: WindowStub },
			],
		});
	});

	beforeEach(() => {
		jasmine.addMatchers(customMatchers);

		window = TestBed.inject(WINDOW) as Window;
	});

	describe(`constructor`, () => {
		it('should be created', () => {
			initService();
			expect(service).toBeTruthy();
		});

		it(`#on should call #on from the rendererAPI`, () => {
			const onSpy = spyOn(window.rendererAPI, 'on');

			initService();
			const channel = 'test-channel-1';
			const listener = () => {};
			service.on(channel, listener);
			expect(onSpy).toHaveBeenCalledWith(channel, listener);
			expect(service.on).toBeTruthy();
			expect(service.on).toShareReferenceWith(window.rendererAPI.on);
		});

		it(`#send should call #send from the rendererAPI`, () => {
			const sendSpy = spyOn(window.rendererAPI, 'send');

			initService();
			const channel = 'test-channel-1';
			const data = 'some data';
			service.send(channel, data);
			expect(sendSpy).toHaveBeenCalledWith(channel, data);
			expect(service.send).toBeTruthy();
			expect(service.send).toShareReferenceWith(window.rendererAPI.send);
		});

		it(`should call #send with argument 'renderer-ready'`, () => {
			// Spy on the send method of the rendererAPI because it exists outside of the service.
			// The spy can be created when the service is instantiated and by then the constructor
			// is has already been called and the method will already be called and cannot
			// be tested otherwise.
			const sendSpy = spyOn(window.rendererAPI, 'send');
			initService();
			expect(sendSpy).toHaveBeenCalledWith('renderer-ready');
		});
	});
});
