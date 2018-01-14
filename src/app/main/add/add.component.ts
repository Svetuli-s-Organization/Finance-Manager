import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  inputDate: any;
  formatedDate: string;
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue'
  };

  constructor(private _localeService: BsLocaleService) {
    this._localeService.use('en-gb');
  }

  ngOnInit() {
  }

  setDate() {
    this.converDate();
  }

  converDate() {
    let dtf = new Intl.DateTimeFormat(['en-GB']);
    this.formatedDate = dtf.format(this.inputDate);
  }

}
