import { Component, OnInit } from '@angular/core';

import { AddComponent } from '@main/add/add.component';
import { Item } from '@main/item';
import { navigationChange } from '@app/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    navigationChange
  ]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
