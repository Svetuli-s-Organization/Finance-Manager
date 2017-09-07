import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdSidenavModule, MdListModule, MdTableModule } from '@angular/material';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TestComponent,
    HomeComponent,
    AddComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
		MdButtonModule,
		MdCheckboxModule,
		MdSidenavModule,
		MdListModule,
		MdTableModule,
		routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
