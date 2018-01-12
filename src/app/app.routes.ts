import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { AddComponent } from './main/add/add.component';

const appRoutes = [
  { path: '', component: MainComponent },
  { path: 'add', component: AddComponent },
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });
