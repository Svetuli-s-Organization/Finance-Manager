import * as path from 'path';

export class WindowStub {
	rendererAPI = {
		on: () => {},
		send: () => {},
		path,
	};
}
