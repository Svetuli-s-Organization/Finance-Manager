import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { Item } from '@main/item';
import { AddComponent } from '@main/add/add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public homeScreen: boolean;

  constructor(private electronService: ElectronService, private ref: ChangeDetectorRef) {
    this.homeScreen = true;
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('open', (event, file) => {
      console.log(JSON.parse(file));
      this.homeScreen = false;
      this.ref.detectChanges();
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

}
