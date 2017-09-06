import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'test', component: TestComponent }
];

export const routing = RouterModule.forRoot(routes);
