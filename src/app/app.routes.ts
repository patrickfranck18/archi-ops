import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CvGeneratorComponent } from './components/cv-generator/cv-generator.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cv-generator', component: CvGeneratorComponent },
  { path: '**', redirectTo: 'dashboard' }
];