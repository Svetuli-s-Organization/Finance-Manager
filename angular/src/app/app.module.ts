import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { TitlebarModule } from '@titlebar/titlebar.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		// Modules
		AppRoutingModule,
		CoreModule,
		TitlebarModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
