import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { FileService } from './services/file/file.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		FileService,
	],
})
export class CoreModule { }
