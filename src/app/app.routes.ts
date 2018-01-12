import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { AddComponent } from './main/add/add.component';
import { StatisticsComponent } from './main/statistics/statistics.component';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddComponent },
  { path: 'statistics', component: StatisticsComponent },
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });
