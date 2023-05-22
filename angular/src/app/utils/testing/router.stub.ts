import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: 'router-outlet',
	template: ``,
	providers: [{ provide: RouterOutlet, useClass: RouterOutletStub }],
})
export class RouterOutletStub {
}
