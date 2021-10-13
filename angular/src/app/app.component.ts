import { Component } from '@angular/core';

// External libraries
import { Observable, Subject } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	welcomeScreenClickSubject: Subject<void> = new Subject();
	welcomeScreenClick: Observable<void> = this.welcomeScreenClickSubject.asObservable();

}
