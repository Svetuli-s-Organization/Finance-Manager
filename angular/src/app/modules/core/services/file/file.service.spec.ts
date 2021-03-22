import { TestBed } from '@angular/core/testing';

// Services
import { FileService } from './file.service';

// Classes and Interfaces
import { AppFile } from '@structures/file';
import { testBehaviorSubjectStream } from '@app/utils/testing/observable';

describe('FileService', () => {
	let service: FileService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
	});

	beforeEach(() => {
		service = TestBed.inject(FileService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
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
