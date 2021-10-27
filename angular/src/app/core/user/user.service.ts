import { Injectable, NgZone } from '@angular/core';

// External libraries
import { ReplaySubject, Observable } from 'rxjs';

// Services
import { ElectronService } from '@core/electron/electron.service';

// Classes and Interfaces
import { UserMetadata } from '@root/shared/types';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private userMetadataSubject: ReplaySubject<UserMetadata> = new ReplaySubject(1);
	public userMetadata: Observable<UserMetadata> = this.userMetadataSubject.asObservable();

	constructor(
		private zone: NgZone,
		private electronService: ElectronService,
	) {
		this.electronService.send('user-service-ready');

		this.setUserMetadata();
	}

	private setUserMetadata() {
		this.electronService.on('user-metadata', (data: UserMetadata) => {
			this.zone.run(() => {
				this.userMetadataSubject.next(data);
			});
		});
	}

}
