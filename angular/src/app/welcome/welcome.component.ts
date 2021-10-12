import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

// Services
import { ElectronService } from '@core/electron/electron.service';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	@Output() clickEvent: EventEmitter<void> = new EventEmitter();

	constructor(private electronService: ElectronService) { }

	ngOnInit() {
	}

	@HostListener('click')
	handleClick() {
		this.clickEvent.next();
	}

}
