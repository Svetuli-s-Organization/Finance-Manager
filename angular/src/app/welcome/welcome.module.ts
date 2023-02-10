import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { WelcomeRoutingModule } from './welcome-routing.module';

// Components
import { WelcomeComponent } from './welcome.component';

@NgModule({
	declarations: [
		WelcomeComponent,
	],
	imports: [
		CommonModule,
		WelcomeRoutingModule,
	],
})
export class WelcomeModule { }
