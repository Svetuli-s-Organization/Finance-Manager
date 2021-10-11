import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Modules
import { CoreModule } from '@core/core.module';
import { WelcomeModule } from '@modules/welcome/welcome.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		// Modules
		CoreModule,
		WelcomeModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
