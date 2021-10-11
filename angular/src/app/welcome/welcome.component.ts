import { Component, OnInit } from '@angular/core';

// Services
import { ElectronService } from '@core/electron/electron.service';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	constructor(private electronService: ElectronService) { }

	ngOnInit() {
	}

}
