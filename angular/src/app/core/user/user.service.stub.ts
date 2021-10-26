// External libraries
import { Observable, Subject } from 'rxjs';

// Classes and Interfaces
import { UserMetadata } from '@structures/user';

export const getUserServiceStub = () => {
	const userMetadataSubject: Subject<UserMetadata> = new Subject();
	return {
		userServiceStub: new UserServiceStub(userMetadataSubject),
		userMetadataSubject,
	};
};

export class UserServiceStub {
	userMetadata: Observable<UserMetadata> = this.userMetadataSubject.asObservable();

	constructor(private userMetadataSubject: Subject<UserMetadata>) {}
}
