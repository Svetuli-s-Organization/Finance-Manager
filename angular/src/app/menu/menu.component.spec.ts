import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { MenuComponent } from './menu.component';

// Services
import { ElectronService } from '@core/electron/electron.service';
// Service stubs
import { ElectronServiceStub } from '@core/electron/electron.service.stub';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;
	let de: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MenuComponent,
			],
			providers: [
				{ provide: ElectronService, useClass: ElectronServiceStub },
			],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MenuComponent);
		component = fixture.componentInstance;
		let de = fixture.debugElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe(`class`, () => {

	});

	describe(`template`, () => {
		beforeEach(() => {
			fixture.detectChanges();
		});
	});
});
