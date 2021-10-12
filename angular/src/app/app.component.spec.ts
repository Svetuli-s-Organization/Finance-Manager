import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';

@Component({
	selector: 'app-welcome',
	template: ``,
})
class WelcomeComponentStub {
}

@Component({
	selector: 'app-titlebar',
	template: ``,
})
class TitlebarComponentStub {
}

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let de: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				WelcomeComponentStub,
				TitlebarComponentStub,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		de = fixture.debugElement;
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});

	describe(`template`, () => {
		beforeEach(() => {
			fixture.detectChanges();
		});

		it(`should display the menu and welcome components`, () => {
			const titlebarComponent = de.query(By.css('app-titlebar'));
			const welcomeComponent = de.query(By.css('app-welcome'));

			expect(titlebarComponent).toBeTruthy();
			expect(welcomeComponent).toBeTruthy();
		});
	});
});
