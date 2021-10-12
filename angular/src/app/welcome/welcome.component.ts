import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	@Output() clickEvent: EventEmitter<void> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	@HostListener('click')
	handleClick() {
		this.clickEvent.next();
	}

}
