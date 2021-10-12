import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;
	let de: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MenuComponent,
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
