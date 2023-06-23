import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../shared/components/home-layout/home-layout.component';
import { ParentNavbarComponent } from '../shared/components/parent-navbar/parent-navbar.component';
import { BulletinsComponent } from './Bulletins/bulletins/bulletins.component';
import { DetailsBulletinComponent } from './Bulletins/details-bulletin/details-bulletin.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { EmploiComponent } from './emploi/emploi.component';
import { NotesComponent } from './notes/notes.component';
import { AfficherProfileComponent } from './Profile/afficher-profile/afficher-profile.component';
import { ModifierProfileComponent } from './Profile/modifier-profile/modifier-profile.component';
import { AfficherPunitionComponent } from './punition/afficher-punition/afficher-punition.component';
import { ListePunitionsComponent } from './punition/liste-punitions/liste-punitions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: ParentNavbarComponent,
        children: [
          {
            path: '',
            component: AfficherProfileComponent
          },
          {
            path: 'modifierProfileParent/:id',
            component: ModifierProfileComponent
          },
          {
            path: 'discipline',
            component: DisciplineComponent
          },
          {
            path: 'punitions',
            component: ListePunitionsComponent
          },
          {
            path: 'afficherPunition/:id',
            component: AfficherPunitionComponent
          },
          {
            path: 'notes',
            component: NotesComponent
          },
          {
            path: 'emploi',
            component: EmploiComponent
          },
          {
            path: 'bulletins',
            component:BulletinsComponent
          },
         

        ]
      }
    ]

  },
  {
    path: 'Detailsbulletin/:id',
    component:DetailsBulletinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppParentRoutingModule { }
