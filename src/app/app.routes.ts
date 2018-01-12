import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';

const appRoutes = [
  { path: '', component: MainComponent }
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });
