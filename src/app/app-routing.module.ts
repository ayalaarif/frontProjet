import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './shared/components/not-found404/not-found404.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { EleveGuard } from './shared/guards/eleve.guard';


const routes: Routes = [
  {
    path: 'admin',
    canActivate:[AuthGuard,AdminGuard],
    //component: AdminLayoutComponent,
    loadChildren: () => import('./app-admin/app-admin.module').then(mod => mod.AppAdminModule), 
  },
  {
    path: '',
    //component: AdminLayoutComponent,
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'eleve',
    canActivate:[AuthGuard, EleveGuard],
    loadChildren: () => import('./app-eleve/app-eleve.module').then(mod => mod.AppEleveModule)

  },
  
  
  {
    path: '**',
    component: NotFound404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
