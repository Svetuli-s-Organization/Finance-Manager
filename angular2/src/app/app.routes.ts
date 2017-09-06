import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'add', component: AddComponent },
	{ path: 'statistics', component: StatisticsComponent },
	{ path: 'test', component: TestComponent }
];

export const routing = RouterModule.forRoot(routes);
