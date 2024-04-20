import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { WINDOW } from '@core/window/window.service';
import { UserService } from '@core/user/user.service';
import { ElectronService } from '@core/electron/electron.service';
import { FileService } from '@core/file/file.service';

// Classes and Interfaces
import { AppFile } from '@structures/file';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	recentFiles: RecentFile[] = [];

	constructor(
		@Inject(WINDOW) private window: Window,
		private router: Router,
		private electronService: ElectronService,
		private userService: UserService,
		private fileService: FileService,
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

		this.electronService.on('file-contents', (fileContents: AppFile) => {
			this.fileService.file = fileContents;
		});
	}

	openFile() {
		this.electronService.send('open-file');
	}

	handleSelectRecentFile(recentFile: RecentFile) {
		this.electronService.send('get-file-by-path', recentFile.fullPath);
		this.router.navigate(['/main']);
	}

}

export interface RecentFile {
	name: string;
	fullPath: string;
}
