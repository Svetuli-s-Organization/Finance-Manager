import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  inputDate: any;
  convertedDate: string;
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue',
    dateInputFormat: 'DD.MM.YYYY'
  };

  constructor() {}

  ngOnInit() {
    this.inputDate = new Date();
    this.convertDate();
  }

  public convertDate() {
    let day: number = this.inputDate.getDate();
    let month: number = this.inputDate.getMonth() + 1;
    let year: number = this.inputDate.getFullYear();
    let formatedDate = ('0' + day).slice(-2) + '.' + ('0' + month).slice(-2) + '.' + year;

    this.convertedDate = formatedDate;
  }

}
