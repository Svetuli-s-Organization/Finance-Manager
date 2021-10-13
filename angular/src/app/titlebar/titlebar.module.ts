import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { TitlebarService } from './titlebar.service';

// Components
import { TitlebarComponent } from './titlebar.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
	declarations: [
		TitlebarComponent,
		MenuComponent,
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
