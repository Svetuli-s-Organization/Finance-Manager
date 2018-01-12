import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { AddComponent } from './main/add/add.component';
import { StatisticsComponent } from './main/statistics/statistics.component';

const appRoutes = [
  { path: '', component: MainComponent },
  { path: 'add', component: AddComponent },
  { path: 'statistics', component: StatisticsComponent },
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });
