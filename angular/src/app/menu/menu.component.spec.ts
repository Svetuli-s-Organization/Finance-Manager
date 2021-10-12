import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// External libraries
import { Subject } from 'rxjs';

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
		let electronService: ElectronService;

		beforeEach(() => {
			electronService = TestBed.inject(ElectronService);
		});

		it(`#ngOnInit should handle window maximize and unminimize events`, () => {
			const onSubject: Subject<string> = new Subject();
			const onSpy = spyOn(electronService, 'on').and.callFake((channel, listener) => {
				onSubject.subscribe(testChannel => {
					if (testChannel === channel) {
						listener(null);
					}
				});
			});

			component.ngOnInit();
			expect(component.maximized).toBeUndefined();
			expect(onSpy.calls.allArgs()[0][0]).toEqual('window-maximize');
			expect(onSpy.calls.allArgs()[1][0]).toEqual('window-unmaximize');

			onSubject.next('window-maximize');
			expect(component.maximized).toBeTrue();

			onSubject.next('window-unmaximize');
			expect(component.maximized).toBeFalse();
		});
	});

	describe(`template`, () => {
		beforeEach(() => {
			fixture.detectChanges();
		});
	});
});
