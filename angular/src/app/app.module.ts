import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Modules
import { WelcomeModule } from '@modules/welcome/welcome.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		// Modules
		WelcomeModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
