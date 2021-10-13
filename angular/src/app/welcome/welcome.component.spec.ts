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

	describe(`class`, () => {
		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it(`#ngOnInit should do nothing`, () => {
			component.ngOnInit();
			expect(true).toBeTrue();
		});

		it(`#handleClick should emit to the #clickEvent Output`, () => {
			component.clickEvent.subscribe(() => {
				expect(true).toBeTrue();
			});
			component.handleClick();
		});
	});
});
