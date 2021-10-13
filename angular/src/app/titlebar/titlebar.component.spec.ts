import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { TitlebarComponent } from './titlebar.component';

// Services
import { TitlebarService } from './titlebar.service';
// Service stubs
import { getTitlebarServiceStub } from './titlebar.service.stub';

@Component({
	selector: 'app-menu',
	template: ``,
})
class MenuComponentStub {
	@Input() focusLose: any;
}

describe('TitlebarComponent', () => {
	let component: TitlebarComponent;
	let fixture: ComponentFixture<TitlebarComponent>;

	const { titlebarServiceStub, windowMaximizedSubject, windowUnmaximizedSubject } = getTitlebarServiceStub();

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				TitlebarComponent,
				MenuComponentStub,
			],
			providers: [
				{ provide: TitlebarService, useValue: titlebarServiceStub },
			],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TitlebarComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe(`class`, () => {
		let titlebarService: TitlebarService;

		beforeEach(() => {
			titlebarService = TestBed.inject(TitlebarService);
		});

		it(`#ngOnInit should handle window maximize and unmaximize events`, () => {
			component.ngOnInit();
			expect(component.maximized).toBeUndefined();

			windowMaximizedSubject.next();
			expect(component.maximized).toBeTrue();

			windowUnmaximizedSubject.next();
			expect(component.maximized).toBeFalse();
		});

		it(`#minimizeWindow should call #sendWindowMinimizeEvent from TitlebarService`, () => {
			const sendWindowMinimizeEventSpy = spyOn(titlebarService, 'sendWindowMinimizeEvent');
			component.minimizeWindow();
			expect(sendWindowMinimizeEventSpy).toHaveBeenCalled();
		});

		it(`#maximizeWindow should call #sendWindowMaximizeEvent from TitlebarService`, () => {
			const sendWindowMaximizeEventSpy = spyOn(titlebarService, 'sendWindowMaximizeEvent');
			component.maximizeWindow();
			expect(sendWindowMaximizeEventSpy).toHaveBeenCalled();
		});

		it(`#restoreWindow should call #sendWindowRestoreEvent from TitlebarService`, () => {
			const sendWindowRestoreEventSpy = spyOn(titlebarService, 'sendWindowRestoreEvent');
			component.restoreWindow();
			expect(sendWindowRestoreEventSpy).toHaveBeenCalled();
		});

		it(`#closeWindow should call #sendWindowCloseEvent from TitlebarService`, () => {
			const sendWindowCloseEventSpy = spyOn(titlebarService, 'sendWindowCloseEvent');
			component.closeWindow();
			expect(sendWindowCloseEventSpy).toHaveBeenCalled();
		});
	});

	describe(`template`, () => {
		let de: DebugElement;

		beforeEach(() => {
			fixture.detectChanges();
			de = fixture.debugElement;
		});

		describe(`window icons`, () => {
			it(`should display the restore icon when #maximized is true`, () => {
				component.maximized = true;
				fixture.detectChanges();
				const iconWrapper = de.query(By.css('.window-icon-restore'));
				expect(iconWrapper).toBeTruthy();
			});

			it(`should display the maximize icon when #maximized is false`, () => {
				component.maximized = false;
				fixture.detectChanges();
				const iconWrapper = de.query(By.css('.window-icon-maximize'));
				expect(iconWrapper).toBeTruthy();
			});

			it(`should call #minimizeWindow when the minimize icon is clicked`, () => {
				const minimizeWindowSpy = spyOn(component, 'minimizeWindow');
				const iconWrapper = de.query(By.css('.window-icon-minimize'));
				iconWrapper.triggerEventHandler('click', null);
				expect(minimizeWindowSpy).toHaveBeenCalled();
			});

			it(`should call #maximizeWindow when the maximize icon is clicked`, () => {
				component.maximized = false;
				fixture.detectChanges();
				const maximizeWindowSpy = spyOn(component, 'maximizeWindow');
				const iconWrapper = de.query(By.css('.window-icon-maximize'));
				iconWrapper.triggerEventHandler('click', null);
				expect(maximizeWindowSpy).toHaveBeenCalled();
			});

			it(`should call #restoreWindow when the restore icon is clicked`, () => {
				component.maximized = true;
				fixture.detectChanges();
				const restoreWindowSpy = spyOn(component, 'restoreWindow');
				const iconWrapper = de.query(By.css('.window-icon-restore'));
				iconWrapper.triggerEventHandler('click', null);
				fixture.detectChanges();
				expect(restoreWindowSpy).toHaveBeenCalled();
			});

			it(`should call #closeWindow when the close icon is clicked`, () => {
				const closeWindowSpy = spyOn(component, 'closeWindow');
				const iconWrapper = de.query(By.css('.window-icon-close'));
				iconWrapper.triggerEventHandler('click', null);
				fixture.detectChanges();
				expect(closeWindowSpy).toHaveBeenCalled();
			});
		});
	});
});
