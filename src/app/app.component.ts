import { Component, OnInit, NgZone } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { Item } from '@main/item';
import { AddComponent } from '@main/add/add.component';

import { UserService } from '@api/electron/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public homeScreen: boolean = true;
  public activeElement: string = 'home';
  public recentFiles: string[];
  public recentFilesPaths: string[];

  constructor(
    private zone: NgZone,
    private electronService: ElectronService,
    private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserMetaData().then((metaData: any) => {
      this.recentFilesPaths = metaData.recentFilesPaths;
      this.recentFiles = metaData.recentFilesPaths.map((recentFilePath: string) => {
        const pathSeperator: string = recentFilePath.includes('/') ? '/' : '\\';
        return recentFilePath.split(pathSeperator)[recentFilePath.split(pathSeperator).length - 1];
      });
    });

    this.electronService.ipcRenderer.on('open', (event, file) => {
      this.zone.run(() => {
        console.log(JSON.parse(file));
        this.homeScreen = false;
      });
    });
  }

  private handleSavedItems(items: Item[]) {
    console.log(items);
  }

  public onActivate(component) {
    if (component instanceof AddComponent) {
      component.savedItems.subscribe(this.handleSavedItems);
    }
  }

  public onDeactivate(component) {

  }

  public openFile(filePath?: string) {
    if(!filePath) {
      this.electronService.ipcRenderer.send('open-file');
    } else {
      this.electronService.ipcRenderer.send('open-file', filePath);
      // TODO: Open file ()
      // TODO: Create file service
    }
  }

}
