import { Component } from "@angular/core";
import { NavigationExtras, RouterOutlet } from "@angular/router";

@Component({
	selector: 'router-outlet',
	template: ``,
	providers: [{ provide: RouterOutlet, useClass: RouterOutletStub }],
})
export class RouterOutletStub {
}

export interface RouterStub {
	navigate(commands: any[], extras?: NavigationExtras): any;
}

export const getRouterSpy = () => jasmine.createSpyObj<RouterStub>('routerSpy', {
	navigate: (commands: any[], extras?: NavigationExtras) => { },
});
