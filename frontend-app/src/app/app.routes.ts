import { Routes } from '@angular/router';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
	{ path: '', component: ProjectsComponent },
	{ path: ':projectId', component: ProjectComponent },
];
