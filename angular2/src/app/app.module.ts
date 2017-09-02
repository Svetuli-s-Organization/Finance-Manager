import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
		routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
