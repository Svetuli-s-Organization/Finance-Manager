import { TestBed, ComponentFixture } from '@angular/core/testing';

// External libraries
import { configureTestSuite, createTestContext, TestCtx } from 'ng-bullet';

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
	let ctx: TestCtx<AppComponent>;
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	configureTestSuite((() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				WelcomeComponentStub,
			],
		});
	}));

	beforeEach(() => {
		ctx = createTestContext(AppComponent);
		component = ctx.component;
		fixture = ctx.fixture;
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});
});
