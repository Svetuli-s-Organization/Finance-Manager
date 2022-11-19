import { Component, OnInit } from '@angular/core';

// External libraries
import { Observable, Subject } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	appClickSubject: Subject<void> = new Subject();
	appClick: Observable<void> = this.appClickSubject.asObservable();

	showWelcome: boolean;

	constructor() {}

	ngOnInit() {
		// Logic for showing the welcome or not
		this.showWelcome = true;
	}

	sendClickToMenu() {
		this.appClickSubject.next();
	}

}
