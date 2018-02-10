import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  inputDate: any;
  addForm: FormGroup;

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue',
    dateInputFormat: 'DD.MM.YYYY'
  };

  constructor() {}

  ngOnInit() {
    this.inputDate = new Date();
    let numberValidator = Validators.pattern(/^-?\d*(\.\d+)?$/);
    let dateValidator = Validators.pattern(/^(0[1-9]|1[0-2])\.(0[1-9]|[1-2][0-9]|3[0-1])\.[0-9]{4}$/); // TODO: fix date validator

    this.addForm = new FormGroup({
      date: new FormControl(this.inputDate, [dateValidator]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [numberValidator]),
    });
  }

  public addItem() {
    console.log(this.addForm.value);
    console.log(this.addForm.valid);
  }

}
