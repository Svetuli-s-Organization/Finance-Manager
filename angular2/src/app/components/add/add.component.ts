import { Component, OnInit } from '@angular/core';
import { MdTableModule } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

	displayedColumns = ['food', 'electricity', 'water', 'internet', 'tv', 'other'];
  dataSource = new ExampleDataSource();

  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  food: number;
  electricity: number;
  water: number;
  internet: number;
	tv: number;
	other: number;
}

const data: Element[] = [
  { food: 15.33, electricity: 10.25, water: 1.17, internet: 25, tv: 14.10, other: 25.63 },
	{ food: 15.33, electricity: 10.25, water: 1.17, internet: 25, tv: 14.10, other: 25.63 },
];

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() {}
}
