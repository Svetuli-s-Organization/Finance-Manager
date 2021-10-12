import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';

// External libraries
import { Subject } from 'rxjs';

// Services
import { TitlebarService } from './titlebar.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {

	@Input() focusLoseSubject: Subject<void>;

	menuItems: MenuItem[] = [
		{
			id: 'file',
			name: 'File',
			subMenu: [
				{ id: 'newFile', name: 'New File' },
				{ id: 'openRecent', name: 'Open Recent' },
				{ id: 'separator', name: '' },
				{
					id: 'preferences',
					name: 'Preferences',
					subMenu: [
						{ id: 'settings', name: 'Settings' },
						{ id: 'keyboardShortcuts', name: 'Keyboard Shortcuts' },
					],
				},
				{ id: 'quit', name: 'Quit' },
			],
		},
		{
			id: 'edit',
			name: 'Edit',
			subMenu: [
				{ id: 'undo', name: 'Undo' },
				{ id: 'redo', name: 'Redo' },
			],
		},
		{
			id: 'view',
			name: 'View',
			subMenu: [
				{ id: 'reload', name: 'Reload' },
				{ id: 'forceReload', name: 'Force Reload' },
				{ id: 'toggleDevTools', name: 'Toggle Developer Tools' },
				{ id: 'separator', name: '' },
				{ id: 'resetZoom', name: 'Reset Zoom' },
				{ id: 'zoomIn', name: 'Zoom In' },
				{ id: 'zoomOut', name: 'Zoom Out' },
				{ id: 'separator', name: '' },
				{ id: 'toggleFullsceen', name: 'Toggle Fullsceen' },
			],
		},
		{
			id: 'window',
			name: 'Window',
			subMenu: [
				{ id: 'minimize', name: 'Minimize' },
				{ id: 'zoom', name: 'Zoom' },
				{ id: 'Close', name: 'Close' },
			],
		},
		{
			id: 'help',
			name: 'Help',
			subMenu: [
				{ id: 'about', name: 'About' },
			],
		},
	];

	clickedMenuItem: MenuItem = null;

	maximized: boolean;

	constructor(
		private cd: ChangeDetectorRef,
		private titlebarService: TitlebarService,
	) { }

	ngOnInit() {
		this.titlebarService.windowMaximized.subscribe(() => {
			this.maximized = true;
			this.cd.detectChanges();
		});

		this.titlebarService.windowUnmaximized.subscribe(() => {
			this.maximized = false;
			this.cd.detectChanges();
		});
	}

	ngOnChanges() {
		this.focusLoseSubject?.subscribe(() => {
			this.clickedMenuItem = null;
		});
	}

	toggleActiveMenuItem(item: MenuItem) {
		if (this.clickedMenuItem && this.clickedMenuItem.id !== item.id) {
			this.clickedMenuItem = item;
		}
	}

	toggleClickedMenuItem(item: MenuItem) {
		if (this.clickedMenuItem?.id === item.id) {
			this.clickedMenuItem = null;
		} else {
			this.clickedMenuItem = item;
		}
	}

}

interface MenuItem {
	id: string;
	name: string;
	subMenu?: MenuItem[];
}
