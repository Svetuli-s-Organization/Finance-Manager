export class WindowStub {
	rendererAPI = {
		on: () => {},
		send: () => {},
		path: {
			basename: (path: string, exp?: string) => {
				const segments = path.split('/');
				return segments[segments.length - 1];
			},
		},
	};
}
