import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from "./components/test/test.component";
import { MainComponent } from "./components/main/main.component";

const routes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'test', component: TestComponent }
];

export const routing = RouterModule.forRoot(routes);
