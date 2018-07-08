import { Component, OnInit, NgZone } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { FileService } from '@api/file/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public welcomeScreen: boolean = true;

  constructor(
    private zone: NgZone,
    private electronService: ElectronService,
    private fileService: FileService,
  ) {}

  ngOnInit() {
    this.electronService.ipcRenderer.on('console', (event, data) => {
      console.log('[ELECTRON]', data);
    });

    this.electronService.ipcRenderer.on('open', (event, file) => {
      this.zone.run(() => {
        this.setup(file);
      });
    });
  }

  private setup(file_) {
    let file;
    try {
      file = JSON.parse(file_);
    } catch(err) {
      console.log(err);
    }

    this.fileService.setFile(file);
    this.welcomeScreen = false;
  }

}
