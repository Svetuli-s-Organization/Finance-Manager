import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { TitlebarService } from './titlebar.service';

// Components
import { MenuComponent } from './menu.component';

@NgModule({
	declarations: [
		MenuComponent,
	],
	imports: [
		CommonModule,
	],
	providers: [
		TitlebarService,
	],
	exports: [
		MenuComponent,
	],
})
export class TitlebarModule { }
