import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent, AddComponent],
  exports: [MainComponent]
})
export class MainModule { }
