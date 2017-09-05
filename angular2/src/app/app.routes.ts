import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./components/main/main.component";

const routes: Routes = [
	{ path: '', component: MainComponent }
];

export const routing = RouterModule.forRoot(routes);
