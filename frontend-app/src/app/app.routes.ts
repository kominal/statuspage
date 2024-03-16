import { Routes } from '@angular/router';
import { GroupsComponent } from './pages/groups/groups.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
	{ path: '', component: GroupsComponent },
	{ path: ':groupSlug', component: ProjectsComponent },
	{ path: ':groupSlug/:projectSlug', component: ProjectComponent },
];
