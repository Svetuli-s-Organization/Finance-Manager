import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Modules
import { CoreModule } from '@core/core.module';
import { WelcomeModule } from '@welcome/welcome.module';
import { TitlebarModule } from '@titlebar/titlebar.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		// Modules
		CoreModule,
		WelcomeModule,
		TitlebarModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
