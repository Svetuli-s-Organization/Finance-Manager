import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { WINDOW_PROVIDERS } from './window/window.service';
import { ElectronService } from './electron/electron.service';
import { FileService } from './file/file.service';
import { UserService } from './user/user.service';

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
