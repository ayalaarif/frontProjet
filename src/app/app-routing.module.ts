import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './shared/components/not-found404/not-found404.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { EleveGuard } from './shared/guards/eleve.guard';
import { EnseignantGuard } from './shared/guards/enseignant.guard';
import { ParentGuard } from './shared/guards/parent.guard';

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
    path: 'enseignant',
    canActivate:[AuthGuard, EnseignantGuard],
    loadChildren: () => import('./app-enseignant/app-enseignant.module').then(mod => mod.AppEnseignantModule)

  },
  {
    path: 'parent',
    canActivate:[AuthGuard, ParentGuard],
    loadChildren: () => import('./app-parent/app-parent.module').then(mod => mod.AppParentModule)

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
