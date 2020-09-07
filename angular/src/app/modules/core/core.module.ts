import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { WINDOW_PROVIDERS } from './services/window/window.service';
import { FileService } from './services/file/file.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		WINDOW_PROVIDERS,
		FileService,
	],
})
export class CoreModule { }
