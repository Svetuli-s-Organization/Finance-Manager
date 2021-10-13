import { BrowserWindowRef, windowFactory, WindowRef } from './window.service';

describe(`Window`, () => {
	class IncompleteWindowRef extends WindowRef {
		constructor() {
			super();
		}
	}

	class CompleteWindowRef extends WindowRef {
		constructor() {
			super();
		}

		get nativeWindow() {
			return {
				winddowPropA: 'prop a',
				winddowPropB: 'prop b',
			};
		}
	}

	describe(`WindowRef`, () => {
		it(`#nativeWindow should throw error when accessed and it's not implemented`, () => {
			const someWindowRef = new IncompleteWindowRef();
			expect(() => someWindowRef.nativeWindow).toThrowError('Not implemented.');
		});
	});

	describe(`BrowserWindowRef`, () => {
		it(`#nativeWindow should return #window`, () => {
			const browserRef = new BrowserWindowRef();
			expect(browserRef.nativeWindow).toEqual(window);
		});
	});

	describe(`windowFactory`, () => {
		it(`should return the #windowRef.nativeWindow when the platform is 'browser'`, () => {
			const completewindowRef = new CompleteWindowRef();
			expect(windowFactory(completewindowRef, 'browser')).toEqual(completewindowRef.nativeWindow);
		});

		it(`should return a new Object when the platform is not 'browser'`, () => {
			const completewindowRef = new CompleteWindowRef();
			expect(windowFactory(completewindowRef, 'server')).toEqual(new Object());
		});
	});
});
