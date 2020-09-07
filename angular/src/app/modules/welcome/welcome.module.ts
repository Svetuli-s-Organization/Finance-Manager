import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
	declarations: [
		WelcomeComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		WelcomeComponent,
	],
})
export class WelcomeModule { }
