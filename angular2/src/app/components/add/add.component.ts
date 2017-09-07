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

// export interface Element {
//   food: number;
//   electricity: number;
//   water: number;
//   internet: number;
// 	tv: number;
// 	other: number;
// }

export class Element {
	_colums: [string];

	constructor(){
		this._colums = ['month', 'food', 'electricity', 'water', 'internet', 'tv', 'other'];
	}

	addColumn(col: string){
		this._colums.push(col);
	}

	getColumns(){
		return this._colums;
	}
}

// const data = [
//   { food: 15.33, electricity: 10.25, water: 1.17, internet: 25, tv: 14.10, other: 25.63 },
// 	{ food: 15.33, electricity: 10.25, water: 1.17, internet: 25, tv: 14.10, other: 25.63 },
// ];

var data = [];
let elem = new Element();
let columns = elem.getColumns();
let obj = {};

for(let i = 0; i < columns.length; i++){
	obj[columns[i]] = Math.floor((Math.random() * 10) + 1);
}
data.push(obj);

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return Observable.of(data);
  }

  disconnect() {}
}