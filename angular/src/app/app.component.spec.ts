import { Component, DebugElement, Input } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
	selector: 'app-titlebar',
	template: ``,
	providers: [{ provide: TitlebarComponent, useClass: TitlebarComponentStub }],
})
class TitlebarComponentStub {
	@Input() focusLose: any;
}

@Component({
	selector: 'app-welcome',
	template: ``,
	providers: [{ provide: WelcomeComponent, useClass: WelcomeComponentStub }],
})
class WelcomeComponentStub {
}

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let de: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				TitlebarComponentStub,
				WelcomeComponentStub,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		de = fixture.debugElement;
		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(component).toBeDefined();
	});

	it(`should display the menu component`, () => {
		const titlebarDe = de.query(By.directive(TitlebarComponent));
		expect(titlebarDe).toBeDefined();
	});

	it(`should bind #appClick to the titlebar component's #focusLose input`, () => {
		const titlebarComponent: TitlebarComponent = de.query(By.directive(TitlebarComponent)).componentInstance;
		expect(titlebarComponent.focusLose).toEqual(component.appClick);
	});

	describe(`When the component is initialized`, () => {
		beforeEach(() => {
			component.ngOnInit();
			fixture.detectChanges();
		});

		it(`should display the welcome component`, () => {
			const welcomeComponent = de.query(By.directive(WelcomeComponentStub));
			expect(welcomeComponent).toBeDefined();
		});
	});

	describe(`When the wrapper is clicked`, () => {
		let appClickSubscription: jasmine.Spy<jasmine.Func>;

		beforeEach(() => {
			appClickSubscription = jasmine.createSpy('appClickSubscription');
			component.appClick.subscribe(appClickSubscription);
			de.query(By.css('.app-wrapper')).triggerEventHandler('click');
		});

		it(`should emit to the #appClick Observable`, () => {
			expect(appClickSubscription).toHaveBeenCalledOnceWith(undefined);
		});
	});
});
