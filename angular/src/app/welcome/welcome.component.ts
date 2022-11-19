import { Component, OnInit, Inject } from '@angular/core';

// Services
import { WINDOW } from '@core/window/window.service';
import { UserService } from '@core/user/user.service';
import { ElectronService } from '@core/electron/electron.service';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	recentFiles: RecentFile[] = [];

	constructor(
		@Inject(WINDOW) private window: Window,
		private electronService: ElectronService,
		private userService: UserService,
	) { }

	ngOnInit() {
		const path = this.window.rendererAPI.path;

		this.userService.userMetadata.subscribe(({ recentFilePaths }) => {
			if (recentFilePaths) {
				this.recentFiles = recentFilePaths.map(recentFilePath => {
					return {
						name: path.basename(recentFilePath),
						fullPath: recentFilePath,
					};
				});
			} else {
				this.recentFiles = [];
			}
		});
	}

	openFile() {
		this.electronService.send('open-file');
	}

}

export interface RecentFile {
	name: string;
	fullPath: string;
}
