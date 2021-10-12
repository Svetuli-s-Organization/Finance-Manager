import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { TitlebarService } from './titlebar.service';

// Components
import { TitlebarComponent } from './titlebar.component';

@NgModule({
	declarations: [
		TitlebarComponent,
	],
	imports: [
		CommonModule,
	],
	providers: [
		TitlebarService,
	],
	exports: [
		TitlebarComponent,
	],
})
export class TitlebarModule { }
