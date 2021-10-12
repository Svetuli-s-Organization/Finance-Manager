import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { MenuComponent } from './menu.component';

// Services
import { TitlebarService } from './titlebar/titlebar.service';
// Service stubs
import { getTitlebarServiceStub } from './titlebar/titlebar.service.stub';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;

	const { titlebarServiceStub, windowMaximizedSubject, windowUnmaximizedSubject } = getTitlebarServiceStub();

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MenuComponent,
			],
			providers: [
				{ provide: TitlebarService, useValue: titlebarServiceStub },
			],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MenuComponent);
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

		it(`#ngOnInit should handle window maximize and unminimize events`, () => {
			component.ngOnInit();
			expect(component.maximized).toBeUndefined();

			windowMaximizedSubject.next();
			expect(component.maximized).toBeTrue();

			windowUnmaximizedSubject.next();
			expect(component.maximized).toBeFalse();
		});
	});

	describe(`template`, () => {
		let de: DebugElement;

		beforeEach(() => {
			fixture.detectChanges();
			de = fixture.debugElement;
		});

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
	});
});
