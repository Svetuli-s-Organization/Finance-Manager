// External libraries
import { Observable, Subject } from 'rxjs';

export const getTitlebarServiceStub = () => {
	const windowMaximizedSubject: Subject<void> = new Subject();
	const windowUnmaximizedSubject: Subject<void> = new Subject();
	return {
		titlebarServiceStub: new TitlebarServiceStub(windowMaximizedSubject, windowUnmaximizedSubject),
		windowMaximizedSubject,
		windowUnmaximizedSubject,
	};
};

export class TitlebarServiceStub {

	constructor(
		private windowMaximizedSubject: Subject<void>,
		private windowUnmaximizedSubject: Subject<void>,
	) {}

	windowMaximized: Observable<void> = this.windowMaximizedSubject.asObservable();
	windowUnmaximized: Observable<void> = this.windowUnmaximizedSubject.asObservable();

	sendWindowMinimizeEvent() {}

	sendWindowMaximizeEvent() {}

	sendWindowRestoreEvent() {}

	sendWindowCloseEvent() {}

}
