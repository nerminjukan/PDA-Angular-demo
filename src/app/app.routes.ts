import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('./components/overview/overview.module').then(m => m.OverviewModule),
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
];
