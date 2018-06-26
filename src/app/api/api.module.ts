import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { UserService } from '@api/electron/user/user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
  ],
})
export class ApiModule { }
