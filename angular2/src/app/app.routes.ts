import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
	{ path: '', component: ContentComponent },
	{ path: 'test', component: TestComponent }
];

export const routing = RouterModule.forRoot(routes);
