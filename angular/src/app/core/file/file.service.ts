import { Injectable } from '@angular/core';

// External libraries
import { BehaviorSubject, Observable } from 'rxjs';

// Services
import { ElectronService } from '@core/electron/electron.service';

// Classes and Interfaces
import { AppFile } from '@structures/file';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	private fileSubject: BehaviorSubject<AppFile> = new BehaviorSubject(null);
	public fileStream: Observable<AppFile> = this.fileSubject.asObservable();

	constructor(private electronService: ElectronService) {
		this.electronService.on('file-contents', (fileContents: AppFile) => {
			this.file = fileContents;
		});
	}

	get file() {
		return this.fileSubject.value;
	}

	set file(newFile: AppFile) {
		this.fileSubject.next(newFile);
	}
}
