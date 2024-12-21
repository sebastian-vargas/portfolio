import { Routes } from '@angular/router';
import { ProjectComponent } from '@pages/portfolio/project/project/project.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'project/:id',
        component: ProjectComponent,
        title: 'Project',
    },
    {
        path: '**',
        redirectTo: '',
    }
];
