import { TestBed, ComponentFixture } from '@angular/core/testing';

// Components
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({
	selector: 'app-welcome',
	template: ``,
})
class WelcomeComponentStub {
}

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				WelcomeComponentStub,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});
});
