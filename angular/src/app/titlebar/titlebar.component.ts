import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

// External libraries
import { Observable } from 'rxjs';

// Services
import { TitlebarService } from './titlebar.service';

@Component({
	selector: 'app-titlebar',
	templateUrl: './titlebar.component.html',
	styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

	@Input() focusLose: Observable<void>;

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

	minimizeWindow() {
		this.titlebarService.sendWindowMinimizeEvent();
	}

	maximizeWindow() {
		this.titlebarService.sendWindowMaximizeEvent();
	}

	restoreWindow() {
		this.titlebarService.sendWindowRestoreEvent();
	}

	closeWindow() {
		this.titlebarService.sendWindowCloseEvent();
	}

}
