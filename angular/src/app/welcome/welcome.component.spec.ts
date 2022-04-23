import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';

// Services
import { WINDOW } from '@core/window/window.service';
import { ElectronService } from '@app/core/electron/electron.service';
import { UserService } from '@core/user/user.service';
// Service Stubs
import { ElectronServiceStub } from '@app/core/electron/electron.service.stub';
import { getUserServiceStub } from '@core/user/user.service.stub';
import { WindowStub } from '@core/window/window.stub';

// Components
import { WelcomeComponent } from './welcome.component';

// Classes and Interfaces
import { UserMetadata } from '@root/shared/types';

describe('WelcomeComponent', () => {
	let component: WelcomeComponent;
	let fixture: ComponentFixture<WelcomeComponent>;

	let electronService: ElectronService;
	let userService: UserService;
	let window: Window;

	const { userServiceStub, userMetadataSubject } = getUserServiceStub();

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				WelcomeComponent,
			],
			providers: [
				{ provide: WINDOW, useClass: WindowStub },
				{ provide: ElectronService, useClass: ElectronServiceStub },
				{ provide: UserService, useValue: userServiceStub },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WelcomeComponent);
		component = fixture.componentInstance;

		electronService = TestBed.inject(ElectronService);
		userService = TestBed.inject(UserService);
		window = TestBed.inject(WINDOW) as Window;
	});

	describe(`class`, () => {
		it('should create', () => {
			expect(component).toBeTruthy();
		});

		describe(`initial values`, () => {
			it(`#recentFiles should be [] initially`, () => {
				expect(component.recentFiles).toEqual([]);
			});
		});

		describe(`#ngOnInit`, () => {
			it(`should set #recentFiles to the recent file paths when they are present in the user metadata`, () => {
				component.ngOnInit();
				expect(component.recentFiles).toEqual([]);

				userMetadataSubject.next({
					recentFilePaths: [
						'folder-1/file-1.fmn',
						'folder-1/file-2.fmn',
					],
				});
				expect(component.recentFiles).toEqual([
					{ name: 'file-1.fmn', fullPath: 'folder-1/file-1.fmn' },
					{ name: 'file-2.fmn', fullPath: 'folder-1/file-2.fmn' },
				]);
			});

			it(`should set #recentFiles to [] when the recent file paths are not present in the user metadata`, () => {
				component.ngOnInit();
				expect(component.recentFiles).toEqual([]);

				component.recentFiles = [
					{ name: 'file-1.fmn', fullPath: 'folder-1/file-1.fmn' },
					{ name: 'file-2.fmn', fullPath: 'folder-1/file-2.fmn' },
				];
				userMetadataSubject.next({} as UserMetadata);
				expect(component.recentFiles).toEqual([]);
			});
		});

		it(`#openFile should send event to channel "open-file" using the ElectronService`, () => {
			const sendSpy = spyOn(electronService, 'send');
			component.openFile();
			expect(sendSpy).toHaveBeenCalledWith('open-file');
			expect(sendSpy).toHaveBeenCalledTimes(1);
		});

		it(`#handleClick should emit to the #clickEvent Output`, () => {
			component.clickEvent.subscribe(() => {
				expect(true).toBeTrue();
			});
			component.handleClick();
		});
	});

	describe(`template`, () => {
		let de: DebugElement;

		beforeEach(() => {
			fixture.detectChanges();
			de = fixture.debugElement;
		});

		it(`should call #openFile when the "Open file" item is clicked`, () => {
			const openFileSpy = spyOn(component, 'openFile');
			const openFileButton = de.query(By.css('#open-file'));
			openFileButton.nativeElement.click();
			expect(openFileSpy).toHaveBeenCalled();
		});

		describe(`recent files`, () => {
			const getRecentFilesList = () => de.query(By.css('#recent-files-list'));
			const getRecentFilesListItems = (recentFilesList: DebugElement) => recentFilesList.queryAll(By.css('li'));

			it(`should display #recentFiles when it exists`, () => {
				component.recentFiles = [
					{ name: 'file-1.fmn', fullPath: 'path-a/file-1.fmn'},
					{ name: 'file-2.fmn', fullPath: 'path-a/file-2.fmn'},
					{ name: 'file.fmn', fullPath: 'path-b/file.fmn'},
				];
				fixture.detectChanges();

				const recentFilesList = getRecentFilesList();
				const recentFilesListItems = getRecentFilesListItems(recentFilesList);
				const recentFilesListItemsText: string[][] = recentFilesListItems.map(item => item.queryAll(By.css('div'))).map(item => item.map(subItem => subItem.nativeElement.innerText));
				expect(recentFilesListItemsText).toEqual([
					['file-1.fmn', 'path-a/file-1.fmn'],
					['file-2.fmn', 'path-a/file-2.fmn'],
					['file.fmn', 'path-b/file.fmn'],
				]);
			});

			it(`should not display #recentFiles`, () => {
				component.recentFiles = [
					{ name: 'file.fmn', fullPath: 'path-b/file.fmn'},
				];
				fixture.detectChanges();

				component.recentFiles = [];
				fixture.detectChanges();

				const recentFilesList = getRecentFilesList();
				const recentFilesListItems = getRecentFilesListItems(recentFilesList);
				expect(recentFilesListItems).toEqual([]);
			});
		});
	});
});
