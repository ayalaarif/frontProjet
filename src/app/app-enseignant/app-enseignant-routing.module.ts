import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantLayoutComponent } from '../shared/components/enseignant-layout/enseignant-layout.component';
import { EnseignantNavbarComponent } from '../shared/components/enseignant-navbar/enseignant-navbar.component';
import { HomeLayoutComponent } from '../shared/components/home-layout/home-layout.component';
import { AffecterGroupesCoursComponent } from './cours/affecter-groupes-cours/affecter-groupes-cours.component';
import { AjouterCoursComponent } from './cours/ajouter-cours/ajouter-cours.component';
import { ListCoursGroupesComponent } from './cours/list-cours-groupes/list-cours-groupes.component';
import { ListCoursComponent } from './cours/list-cours/list-cours.component';
import { DashboardEnseignantComponent } from './dashboard-enseignant/dashboard-enseignant.component';
import { EmploiEnseignantComponent } from './emploi-enseignant/emploi-enseignant.component';
import { AffecterGroupeComponent } from './examens/affecter-groupe/affecter-groupe.component';
import { AjouterExamenComponent } from './examens/ajouter-examen/ajouter-examen.component';
import { ListExamenGroupesComponent } from './examens/list-examen-groupes/list-examen-groupes.component';
import { ListExamensComponent } from './examens/list-examens/list-examens.component';
import { ModifierExamenComponent } from './examens/modifier-examen/modifier-examen.component';
import { ListeAbsencesComponent } from './Gestion_absences/liste-absences/liste-absences.component';
import { MarquerAbsencesComponent } from './Gestion_absences/marquer-absences/marquer-absences.component';
import { ListGroupesComponent } from './groupes/list-groupes/list-groupes.component';
import { ModifierProfileComponent } from './modifier-profile/modifier-profile.component';
import { AffecterNotesComponent } from './notes/affecter-notes/affecter-notes.component';
import { AfficherNotesComponent } from './notes/afficher-notes/afficher-notes.component';
import { ProfileEnseignantComponent } from './profile-enseignant/profile-enseignant.component';
import { AfficherPunitionComponent } from './punition/afficher-punition/afficher-punition.component';
import { AjouterPunitionComponent } from './punition/ajouter-punition/ajouter-punition.component';
import { ListePunitionsComponent } from './punition/liste-punitions/liste-punitions.component';
import { ModifierPunitionComponent } from './punition/modifier-punition/modifier-punition.component';
import { AjouterTraveauComponent } from './traveaux/ajouter-traveau/ajouter-traveau.component';
import { ListTraveauxComponent } from './traveaux/list-traveaux/list-traveaux.component';
import { ModifierTraveauComponent } from './traveaux/modifier-traveau/modifier-traveau.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component:EnseignantNavbarComponent,
        children: [
          {
            path: '',
            component: ProfileEnseignantComponent
          },
         
          {
            path: 'emploi',
            component: EmploiEnseignantComponent
          },
          {
            path: 'modifierProfile/:id',
            component: ModifierProfileComponent
          }
         

        ],

      },
     
      
    ],
  },

  {
    path: 'dashboard',
    component: EnseignantLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardEnseignantComponent
      },
      //groupes components
      {
        path: 'listGroupes',
        component: ListGroupesComponent
      },
      //Cours components 
      {
        path: 'ajouterCours',
        component: AjouterCoursComponent
      },
      {
        path: 'listCours',
        component: ListCoursComponent
      },
      {
        path: 'affecterGroupeCours/:id',
        component: AffecterGroupesCoursComponent
      },
      {
        path: 'listCoursGroupes/:id',
        component: ListCoursGroupesComponent
      },

      //travaux components
      {
        path: 'ajouterTraveau',
        component: AjouterTraveauComponent
      },
      {
        path: 'listTraveaux',
        component: ListTraveauxComponent
      },
      {
        path: 'modifierTraveau/:id',
        component: ModifierTraveauComponent
      },

      //Examen components

      {
        path: 'ajouterExamen',
        component: AjouterExamenComponent
      },
      {
        path: 'listeExamens',
        component: ListExamensComponent
      },
      {
        path: 'modifierExamen/:id',
        component: ModifierExamenComponent
      },
      {
        path: 'affecterGroupe/:id',
        component: AffecterGroupeComponent
      },
      {
        path: 'listExamenGroupes/:id',
        component: ListExamenGroupesComponent
      },

      //Notes components

      {
        path: 'affecterNotes',
        component: AffecterNotesComponent
      },
      {
        path: 'listeNotes',
        component: AfficherNotesComponent
      },

      //Absences components
      {
        path: 'MarquerAbsence',
        component: MarquerAbsencesComponent
      },
      {
        path: 'MarquerAbsence',
        component: MarquerAbsencesComponent
      },
      {
        path: 'ListeAbsence',
        component: ListeAbsencesComponent
      },

      //punitions components
      {
        path: 'AjouterPunition',
        component: AjouterPunitionComponent
      },
      {
        path: 'ListePunitions',
        component: ListePunitionsComponent
      },
      {
        path: 'afficherPunition/:id',
        component: AfficherPunitionComponent
      },
      {
        path: 'ModifierPunitions/:id',
        component: ModifierPunitionComponent
      },


    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppEnseignantRoutingModule { }
