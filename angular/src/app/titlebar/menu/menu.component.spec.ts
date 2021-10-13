import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

// Components
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;

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
		fixture.detectChanges();
	});

	describe(`class`, () => {
		const item1 = { id: 'item-1', name: 'Item 1' };
		const item2 = { id: 'item-2', name: 'Item 2' };

		it('should create', () => {
			expect(component).toBeTruthy();
		});

		describe(`#ngOnChanges`, () => {
			it(`shouldn't change #clickedMenuItem if #focusLose is falsy`, () => {
				component.clickedMenuItem = item1;
				component.ngOnChanges();
				expect(component.clickedMenuItem).toEqual(item1);
			});

			it(`should set #clickedMenuItem to null when #focusLose Observable emits`, () => {
				const focusLoseSubject: Subject<void> = new Subject();
				component.focusLose = focusLoseSubject.asObservable();
				component.ngOnChanges();
				component.clickedMenuItem = item1;
				focusLoseSubject.next();
				expect(component.clickedMenuItem).toBeNull();
			});
		});

		it(`#toggleActiveMenuItem should change #clickedMenuItem if it's truthy and it's different than the new one`, () => {
			component.clickedMenuItem = null;
			component.toggleActiveMenuItem(item1);

			component.clickedMenuItem = item2;
			component.toggleActiveMenuItem(item2);
			expect(component.clickedMenuItem).toEqual(item2);

			component.toggleActiveMenuItem(item1);
			expect(component.clickedMenuItem).toEqual(item1);
		});

		it(`#toggleClickedMenuItem should toggle the value of #clickedMenuItem`, () => {
			component.clickedMenuItem = null;
			component.toggleClickedMenuItem(item1);
			expect(component.clickedMenuItem).toEqual(item1);

			component.toggleClickedMenuItem(item1);
			expect(component.clickedMenuItem).toBeNull();

			component.toggleClickedMenuItem(item2);
			expect(component.clickedMenuItem).toEqual(item2);
		});
	});
});
