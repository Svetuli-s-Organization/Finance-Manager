import { TestBed, ComponentFixture } from '@angular/core/testing';

// Components
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
	let component: WelcomeComponent;
	let fixture: ComponentFixture<WelcomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				WelcomeComponent,
			],
			providers: [],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WelcomeComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
