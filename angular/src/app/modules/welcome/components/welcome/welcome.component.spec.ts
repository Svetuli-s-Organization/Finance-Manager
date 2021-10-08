import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ElectronService } from '@app/modules/core/services/electron/electron.service';
import { ElectronServiceStub } from '@app/modules/core/services/electron/electron.service.stub';

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
