import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routing } from './app.routes';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';

import { NgxElectronModule } from 'ngx-electron';

// Services
import { UserService } from '@api/electron/user/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    MainModule,
    NgxElectronModule,
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
