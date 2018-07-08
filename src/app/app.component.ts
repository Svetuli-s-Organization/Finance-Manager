import { Component, OnInit, NgZone } from '@angular/core';

import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public welcomeScreen: boolean = true;

  constructor(
    private zone: NgZone,
    private electronService: ElectronService
  ) {}

  ngOnInit() {
    this.electronService.ipcRenderer.on('open', (event, file_) => {
      this.zone.run(() => {
        try {
          const file = JSON.parse(file_);
          console.log(file);
          this.welcomeScreen = false;
        } catch(err) {
          console.log('something went wrong');
        }
      });
    });
  }

}
