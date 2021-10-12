import { Injectable } from '@angular/core';
// External libraries
import { Observable, Subject } from 'rxjs';

// Services
import { ElectronService } from '@core/electron/electron.service';

@Injectable({
	providedIn: 'root'
})
export class TitlebarService {

	private windowMaximizedSubject: Subject<void> = new Subject();
	private windowUnmaximizedSubject: Subject<void> = new Subject();

	windowMaximized: Observable<void> = this.windowMaximizedSubject.asObservable();
	windowUnmaximized: Observable<void> = this.windowUnmaximizedSubject.asObservable();

	constructor(private electronService: ElectronService) {
		this.electronService.on('window-maximize', () => {
			this.windowMaximizedSubject.next();
		});

		this.electronService.on('window-unmaximize', () => {
			this.windowUnmaximizedSubject.next();
		});
	}

	sendWindowMinimizeEvent() {
		this.electronService.send('execute-window-minimize');
	}

	sendWindowMaximizeEvent() {
		this.electronService.send('execute-window-maximize');
	}

	sendWindowRestoreEvent() {
		this.electronService.send('execute-window-restore');
	}

	sendWindowCloseEvent() {
		this.electronService.send('execute-window-close');
	}

}
