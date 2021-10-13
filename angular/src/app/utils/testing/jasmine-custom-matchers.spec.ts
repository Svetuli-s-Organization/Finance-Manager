import { customMatchers } from './jasmine-custom-matchers';

describe(`customMatchers`, () => {
	it(`#toShareReferenceWith should compare using === operator`, () => {
		const compareFn = customMatchers.toShareReferenceWith().compare;

		const obj1 = {
			name: 'name 1',
			age: '20',
		};
		const obj2 = {
			name: 'name 1',
			age: '20',
		};

		let result = compareFn(obj1, obj1);
		expect(result).toEqual({ pass: true, message: 'Expected properties to not share a reference' });

		result = compareFn(obj1, obj2);
		expect(result).toEqual({ pass: false, message: 'Expected properties to share a reference' });
	});
});
