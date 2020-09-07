// External libraries
import { Observable } from 'rxjs';

export const testBehaviorSubjectStream = <T>(observable: Observable<T>, getFn: () => T, setFn: (newValue: T) => void, expectedValues: T[], initialValue: T = null) => {
	const values: T[] = [];
	observable.subscribe(value => values.push(value));

	expect(getFn()).toEqual(initialValue);

	for (const expectedValue of expectedValues) {
		setFn(expectedValue);
		expect(getFn()).toEqual(expectedValue);
	}

	expect(values).toEqual([initialValue, ...expectedValues]);
};
