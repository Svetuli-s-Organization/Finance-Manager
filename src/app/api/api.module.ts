import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { UserService } from '@api/electron/user/user.service';
import { FileService } from '@api/file/file.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    FileService,
  ],
})
export class ApiModule { }
