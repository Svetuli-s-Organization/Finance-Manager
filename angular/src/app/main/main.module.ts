import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MainRoutingModule } from './main-routing.module';

// Components
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
