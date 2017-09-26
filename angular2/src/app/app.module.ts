import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddComponent,
    StatisticsComponent,
    TestComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
		routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
