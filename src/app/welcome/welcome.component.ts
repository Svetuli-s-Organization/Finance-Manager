import { Component, OnInit } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { UserService } from '@api/electron/user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public recentFiles: string[];
  public recentFilesPaths: string[];

  constructor(
    private userService: UserService,
    private electronService: ElectronService
  ) {}

  ngOnInit() {
    this.userService.getUserMetaData().then((metaData: any) => {
      this.recentFilesPaths = metaData.recentFilesPaths;
      this.recentFiles = metaData.recentFilesPaths.map((recentFilePath: string) => {
        const pathSeperator: string = recentFilePath.includes('/') ? '/' : '\\';
        return recentFilePath.split(pathSeperator)[recentFilePath.split(pathSeperator).length - 1];
      });
    });
  }

  public openFile(filePath?: string) {
    // TODO: Create file service
    this.electronService.ipcRenderer.send('open-file', filePath);
  }

  public createNewFile() {
    this.electronService.ipcRenderer.send('create-new-file');
  }

}
