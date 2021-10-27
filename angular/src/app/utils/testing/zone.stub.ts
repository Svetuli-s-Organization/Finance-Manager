export class NgZoneStub {
	run(fn: (...args: any[]) => any) {
		return fn();
	}
}
