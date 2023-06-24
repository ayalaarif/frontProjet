import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EleveNavbarComponent } from '../shared/components/eleve-navbar/eleve-navbar/eleve-navbar.component';
import { HomeLayoutComponent } from '../shared/components/home-layout/home-layout.component';
import { BulletinsComponent } from './Bulletins/bulletins/bulletins.component';
import { DetailsBulletinComponent } from './Bulletins/details-bulletin/details-bulletin.component';
import { CoursComponent } from './cours/cours.component';
import { EmploiEleveComponent } from './emploi-eleve/emploi-eleve.component';
import { ExamensComponent } from './examens/examens.component';
import { NotesComponent } from './notes/notes.component';
import { AfficherProfileComponent } from './profile/afficher-profile/afficher-profile.component';
import { ModifierProfileEleveComponent } from './profile/modifier-profile-eleve/modifier-profile-eleve.component';
import { TravauxComponent } from './travaux/travaux.component';
import { ChatsComponent } from './Chat/chats/chats.component';
import { AccueilComponent } from './Accueil/accueil/accueil.component';
import { AcceuilEtudiantComponent } from './acceuil-etudiant/acceuil-etudiant.component';
import { UvComponent } from './uv/uv.component';
import { SpecialiteComponent } from './specialite/specialite.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      
        {
          path: 'accueilEtud',
          component:AcceuilEtudiantComponent
        },
        {
          path: 'specialite',
          component:SpecialiteComponent
        },
        {
          path: 'uvs',
          component:UvComponent
        },
        {
          path: 's',
          component:UvComponent
        },
        
      
      {
        path: '',
        component: EleveNavbarComponent,
        children: [
          {
            path: '',
            component: AfficherProfileComponent
          },
          {
            path:'modifierProfileEleve/:id',
            component: ModifierProfileEleveComponent
          },
          {
            path: 'cours',
            component: CoursComponent
          },
          {
            path: 'examens',
            component: ExamensComponent
          },
          {
            path: 'notes',
            component: NotesComponent
          },
          {
            path: 'travaux',
            component: TravauxComponent
          },
          {
            path: 'emploiEleve',
            component:EmploiEleveComponent
          },
          {
            path: 'bulletins',
            component:BulletinsComponent
          },
          {
            path: 'chats',
            component:ChatsComponent
          },
          {
            path: 'accueil',
            component:AccueilComponent
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
export class AppEleveRoutingModule { }
