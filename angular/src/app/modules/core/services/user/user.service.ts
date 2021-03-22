import { Injectable } from '@angular/core';

// External libraries
import { ReplaySubject, Observable } from 'rxjs';

// Services
import { ElectronService } from '@core/services/electron/electron.service';

// Classes and Interfaces
import { UserMetadata } from '@structures/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private userMetadataSubject: ReplaySubject<UserMetadata> = new ReplaySubject(1);
	public userMetadata: Observable<UserMetadata> = this.userMetadataSubject.asObservable();

	constructor(private electronService: ElectronService) {
		this.electronService.ipcRenderer.send('user-service-ready');

		this.setUserMetadata();
	}

	private setUserMetadata() {
		this.electronService.ipcRenderer.on('user-metadata', (event, data) => {
			this.userMetadataSubject.next(data);
		});
	}

}
