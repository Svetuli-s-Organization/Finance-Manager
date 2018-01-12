import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent, AddComponent, StatisticsComponent],
  exports: [MainComponent]
})
export class MainModule { }
