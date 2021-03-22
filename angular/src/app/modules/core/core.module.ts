import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { WINDOW_PROVIDERS } from './services/window/window.service';
import { ElectronService } from './services/electron/electron.service';
import { FileService } from './services/file/file.service';
import { UserService } from './services/user/user.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		WINDOW_PROVIDERS,
		// Services
		ElectronService,
		FileService,
		UserService,
	],
})
export class CoreModule { }
