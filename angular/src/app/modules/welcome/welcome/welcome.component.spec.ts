import { TestBed, ComponentFixture } from '@angular/core/testing';

// External libraries
import { configureTestSuite, createTestContext, TestCtx } from 'ng-bullet';

// Components
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
	let ctx: TestCtx<WelcomeComponent>;
	let component: WelcomeComponent;
	let fixture: ComponentFixture<WelcomeComponent>;

	configureTestSuite((() => {
		TestBed.configureTestingModule({
			declarations: [
				WelcomeComponent,
			],
		});
	}));

	beforeEach(() => {
		ctx = createTestContext(WelcomeComponent);
		component = ctx.component;
		fixture = ctx.fixture;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
