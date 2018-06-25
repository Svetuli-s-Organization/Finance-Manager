import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { Routing } from '@app/app.routes';

import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [HomeComponent, AddComponent, StatisticsComponent, MainComponent],
  exports: [HomeComponent, MainComponent]
})
export class MainModule { }
