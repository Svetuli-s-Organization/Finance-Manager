declare namespace jasmine {
	interface Matchers<T> {
		toShareReferenceWith(expected: any, expectationFailOutput?: any): boolean;
	}
}
