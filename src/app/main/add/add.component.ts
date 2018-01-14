import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue'
  };

  constructor() { }

  ngOnInit() {
  }

}
