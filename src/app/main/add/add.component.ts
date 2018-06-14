import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Item } from '@main/item';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  inputDate: any;
  addForm: FormGroup;
  public addedItems: Item[] = [];

  @ViewChild('date') date: ElementRef;
  @Output() savedItems: EventEmitter<Item[]> = new EventEmitter();

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue',
    dateInputFormat: 'DD.MM.YYYY'
  };

  constructor() {}

  ngOnInit() {
    this.inputDate = new Date();
    const numberValidator = Validators.pattern(/^-?\d*(\.\d+)?$/);
    const dateValidator = Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.([0-9]){4}$/); // TODO: fix date validator

    this.addForm = new FormGroup({
      date: new FormControl(this.inputDate, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, numberValidator]),
    });
  }

  public addItem() {
    this.processDate();
    this.formatPrice();

    this.addedItems.push(new Item(this.addForm.value.name, this.addForm.value.price, this.addForm.value.date));
    this.addForm.patchValue({ name: '', price: '' });
  }

  public handleKeydownEnter(event: KeyboardEvent) {
    event.preventDefault();
    if(this.addForm.valid) {
      this.addItem();
    }
  }

  public removeItem(addedItemIndex: number) {
    this.addedItems.splice(addedItemIndex, 1);
  }

  public saveItems() {
    this.savedItems.emit(this.addedItems);
  }

  private processDate() {
    const formatedDate: string = this.date.nativeElement.value;
    const dateIsInvalid: boolean = !/^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.([0-9]){4}$/.test(formatedDate);

    if(dateIsInvalid) {
      this.addForm.controls.date.setErrors({ 'incorrect': true });
    }
  }

  private formatPrice() {
    let price: string = this.addForm.controls.price.value;

    const noDecimal: boolean = /^[0-9]{1,}$/.test(price);
    const longDecimal: boolean = /^[0-9]{1,}\.[0-9]{3,}$/.test(price);
    const shortDecimal: boolean = /^[0-9]{1,}\.[0-9]{1}$/.test(price);
    const startsWithZero: boolean = /(^[0][1-9]{1,}$)|(^[0][1-9]{1,}\.[0-9]{0,}$)/.test(price);

    if(startsWithZero) {
      price = price.slice(1, price.length);
      this.addForm.controls.price.patchValue(price);
    }

    if(noDecimal) {
      price = price + '.00';
      this.addForm.controls.price.patchValue(price);
    }

    if(longDecimal) {
      price = (Math.round(Number(price) * 100) / 100).toString();
      this.addForm.controls.price.patchValue(price);
    }

    if(shortDecimal) {
      price = price + '0';
      this.addForm.controls.price.patchValue(price);
    }
  }

}
