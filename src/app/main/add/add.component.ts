import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  date: string;
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue'
  };

  constructor() { }

  ngOnInit() {
  }

  pickDate(datePicker) {
    datePicker.show();
  }

}
