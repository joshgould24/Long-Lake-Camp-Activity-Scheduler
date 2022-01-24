import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scheduler',//redirects user to scheduler page by default
    pathMatch: 'full'
  },
  {
    path: 'loading-page',
    loadChildren: () => import('./pages/loading-page/loading-page.module').then( m => m.LoadingPagePageModule)
  },
  {
    path: 'scheduler',
    loadChildren: () => import('./pages/scheduler/scheduler.module').then( m => m.SchedulerPageModule)
  },
  {
    path: 'export',
    loadChildren: () => import('./pages/export/export.module').then( m => m.ExportPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
