import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';

// Services
import { WINDOW } from '@core/window/window.service';
import { ElectronService } from '@app/core/electron/electron.service';
import { UserService } from '@core/user/user.service';
// Service Stubs
import { getRouterSpy, RouterStub } from '@utils/testing/router.stub';
import { ElectronServiceStubInterface, getElectronServiceSpy } from '@core/electron/electron.service.stub';
import { getUserServiceStub } from '@core/user/user.service.stub';
import { WindowStub } from '@core/window/window.stub';

// Components
import { RecentFile, WelcomeComponent } from './welcome.component';

// Classes and Interfaces
import { UserMetadata } from '@root/shared/types';

describe('WelcomeComponent', () => {
	let component: WelcomeComponent;
	let fixture: ComponentFixture<WelcomeComponent>;

	let routerSpy: jasmine.SpyObj<RouterStub>;
	let electronServiceSpy: jasmine.SpyObj<ElectronServiceStubInterface>;
	let userService: UserService;
	let window: Window;

	const { userServiceStub, userMetadataSubject } = getUserServiceStub();

	beforeEach(async () => {
		routerSpy = getRouterSpy();
		electronServiceSpy = getElectronServiceSpy();

		await TestBed.configureTestingModule({
			declarations: [
				WelcomeComponent,
			],
			providers: [
				{ provide: WINDOW, useClass: WindowStub },
				{ provide: Router, useValue: routerSpy },
				{ provide: ElectronService, useValue: electronServiceSpy },
				{ provide: UserService, useValue: userServiceStub },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WelcomeComponent);
		component = fixture.componentInstance;

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
			component.openFile();
			expect(electronServiceSpy.send).toHaveBeenCalledWith('open-file');
			expect(electronServiceSpy.send).toHaveBeenCalledTimes(1);
		});

		describe(`#handleSelectRecentFile`, () => {
			const recentFile: RecentFile = {
				name: 'file-1',
				fullPath: "path/to/file/file-1",
			};

			beforeEach(() => {
				component.handleSelectRecentFile(recentFile);
			});

			it(`should send the file's full path to the main process`, () => {
				expect(electronServiceSpy.send).toHaveBeenCalledOnceWith('get-file-by-path', recentFile.fullPath);
			});

			it(`should navigate to /main`, () => {
				expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/main']);
			});
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

		it(`should call #handleSelectRecentFile when a file is clicked`, () => {
			const handleSelectRecentFileSpy = spyOn(component, 'handleSelectRecentFile');
			userMetadataSubject.next({
				recentFilePaths: [
					'folder-1/file-1.fmn',
					'folder-1/file-2.fmn',
				],
			});
			fixture.detectChanges();

			const firstRecentFile = de.query(By.css('#recent-files-list .list-item:first-child'));
			firstRecentFile.nativeElement.click();
			expect(handleSelectRecentFileSpy).toHaveBeenCalledWith(component.recentFiles[0]);
		});

		describe(`recent files`, () => {
			const getRecentFilesList = () => de.query(By.css('#recent-files-list'));
			const getRecentFilesListItems = (recentFilesList: DebugElement) => recentFilesList.queryAll(By.css('li'));

			it(`should display #recentFiles when it exists`, () => {
				component.recentFiles = [
					{ name: 'file-1.fmn', fullPath: 'path-a/file-1.fmn' },
					{ name: 'file-2.fmn', fullPath: 'path-a/file-2.fmn' },
					{ name: 'file.fmn', fullPath: 'path-b/file.fmn' },
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
					{ name: 'file.fmn', fullPath: 'path-b/file.fmn' },
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
