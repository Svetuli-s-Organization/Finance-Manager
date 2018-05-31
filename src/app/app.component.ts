import { Component, OnInit, NgZone } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { Item } from '@main/item';
import { AddComponent } from '@main/add/add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public homeScreen: boolean = true;
  public activeElement: string = 'home';

  constructor(private electronService: ElectronService, private zone: NgZone) {}

  ngOnInit() {
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

  public openFile() {
    this.electronService.ipcRenderer.send('open-file');
  }

}
