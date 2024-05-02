import { TestBed } from '@angular/core/testing';

// Services
import { FileService } from './file.service';
import { ElectronService } from '@core/electron/electron.service';
// Service stubs
import { ElectronServiceStubInterface, getElectronServiceSpy, ListenerFunction } from '@core/electron/electron.service.stub';

// Classes and Interfaces
import { AppFile } from '@structures/file';

// Testing
import { testBehaviorSubjectStream } from '@utils/testing/observable';

describe('FileService', () => {
	let service: FileService;
	let electronServiceSpy: jasmine.SpyObj<ElectronServiceStubInterface>;

	const initService = () => {
		const electronService = TestBed.inject(ElectronService);
		service = new FileService(electronService);
	};

	beforeEach(() => {
		electronServiceSpy = getElectronServiceSpy();

		TestBed.configureTestingModule({
			providers: [
				{ provide: ElectronService, useValue: electronServiceSpy },
			],
		});
	});

	beforeEach(() => {
		service = TestBed.inject(FileService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe(`constructor`, () => {
		const mockFile: AppFile = {
			meta: {
				encripted: false,
				userSettings: {},
			},
			data: {},
		};

		beforeEach(() => {
			electronServiceSpy.on.and.callFake((_, listener: ListenerFunction) => {
				listener(mockFile);
			});
			electronServiceSpy.on.calls.reset();
		});

		it(`should listen for file contents events from the main process and push the data #fileStream stream`, () => {
			initService();

			const fileStreamValues = [];
			service.fileStream.subscribe(data => {
				fileStreamValues.push(data);
			});

			expect(fileStreamValues).toEqual([mockFile]);
			expect(electronServiceSpy.on.calls.allArgs()[0][0]).toEqual('file-contents');
			expect(electronServiceSpy.on).toHaveBeenCalledTimes(1);
		});
	});

	it('#file should be an Observable stream with set and get methods', () => {
		const file1: AppFile = {
			meta: {
				encripted: false,
				userSettings: {},
			},
			data: {},
		};
		const file2: AppFile = {
			meta: {
				encripted: true,
				userSettings: {},
			},
			data: {},
		};

		testBehaviorSubjectStream(service.fileStream, () => service.file, newFile => service.file = newFile, [file1, file2]);
	});
});
