import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EleveNavbarComponent } from '../shared/components/eleve-navbar/eleve-navbar/eleve-navbar.component';
import { HomeLayoutComponent } from '../shared/components/home-layout/home-layout.component';

import { CoursComponent } from './cours/cours.component';

import { AfficherProfileComponent } from './profile/afficher-profile/afficher-profile.component';
import { ModifierProfileEleveComponent } from './profile/modifier-profile-eleve/modifier-profile-eleve.component';

import { ChatsComponent } from './Chat/chats/chats.component';
import { AccueilComponent } from './Accueil/accueil/accueil.component';
import { AcceuilEtudiantComponent } from './acceuil-etudiant/acceuil-etudiant.component';
import { UvComponent } from './uv/uv.component';
import { SpecialiteComponent } from './specialite/specialite.component';
import { UvDetailsComponent } from './uv-details/uv-details.component';
import { ProfileAutreEtudiantComponent } from './profile-autre-etudiant/profile-autre-etudiant.component';
import { CoursAutreEtudiantComponent } from './cours-autre-etudiant/cours-autre-etudiant.component';
import { LogementsComponent } from './logements/logements.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AssociationsComponent } from './associations/associations.component';

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
          path: 'detailsUv',
          component:UvDetailsComponent
        },
        {
          path: 'logements',
          component:LogementsComponent
        },
        {
          path: 'restaurants',
          component:RestaurantsComponent
        },
        {
          path: 'associations',
          component:AssociationsComponent
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
            path: 'coursAutreEtudiant',
            component:CoursAutreEtudiantComponent
          },
         
          
          {
            path: 'chats',
            component:ChatsComponent
          },
          {
            path: 'accueil',
            component:AccueilComponent
          },
          {
            path: 'profileAutreEtudiant',
            component: ProfileAutreEtudiantComponent
          },
          
         
        ]
      }
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppEleveRoutingModule { }
