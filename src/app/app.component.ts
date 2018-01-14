import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  setActive(clicked: any, otherItems: any[]) {
    clicked.classList.add('active');
    for(const item of otherItems) {
      item.classList.remove('active');
    }
  }

}
