import { TestBed, ComponentFixture } from '@angular/core/testing';

// Services
import { ElectronService } from '@core/electron/electron.service';
// Service stubs
import { ElectronServiceStub } from '@core/electron/electron.service.stub';

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
			providers: [
				{ provide: ElectronService, useClass: ElectronServiceStub },
			],
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
