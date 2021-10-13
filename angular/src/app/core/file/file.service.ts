import { Injectable } from '@angular/core';

// External libraries
import { BehaviorSubject, Observable } from 'rxjs';

// Classes and Interfaces
import { AppFile } from '@structures/file';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	private fileSubject: BehaviorSubject<AppFile> = new BehaviorSubject(null);
	public fileStream: Observable<AppFile> = this.fileSubject.asObservable();

	constructor() { }

	get file() {
		return this.fileSubject.value;
	}

	set file(newFile: AppFile) {
		this.fileSubject.next(newFile);
	}
}
