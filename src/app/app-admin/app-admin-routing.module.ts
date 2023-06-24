import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../shared/components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AfficherEleveComponent } from './Elèves/afficher-eleve/afficher-eleve.component';
import { AfficherParentComponent } from './Elèves/afficher-parent/afficher-parent.component';
import { AjouterElevesComponent } from './Elèves/ajouter-eleves/ajouter-eleves.component';
import { DemandePreinscriptionComponent } from './Elèves/demande-preinscription/demande-preinscription.component';
import { ListElevesComponent } from './Elèves/list-eleves/list-eleves.component';
import { ListParentsComponent } from './Elèves/list-parents/list-parents.component';
import { ModifierEleveComponent } from './Elèves/modifier-eleve/modifier-eleve.component';
import { ValiderPreinscriptionComponent } from './Elèves/valider-preinscription/valider-preinscription.component';

import { AfficherGroupeComponent } from './Groupes/afficher-groupe/afficher-groupe.component';
import { AjouterGroupeComponent } from './Groupes/ajouter-groupe/ajouter-groupe.component';
import { ListGroupeComponent } from './Groupes/list-groupe/list-groupe.component';
import { ModifierGroupeComponent } from './Groupes/modifier-groupe/modifier-groupe.component';
import { AjouterMatiereComponent } from './Matières/ajouter-matiere/ajouter-matiere.component';
import { ListMatiereComponent } from './Matières/list-matiere/list-matiere.component';
import { AfficherNiveauComponent } from './niveaux/afficher-niveau/afficher-niveau.component';
import { AjouterNiveauComponent } from './niveaux/ajouter-niveau/ajouter-niveau.component';
import { ListNiveauComponent } from './niveaux/list-niveau/list-niveau.component';
import { ModifierNiveauComponent } from './niveaux/modifier-niveau/modifier-niveau.component';

import { AfficherEnseignantsComponent } from './Groupes/afficher-enseignants/afficher-enseignants.component';
import { AffecterEnseignantComponent } from './Groupes/affecter-enseignant/affecter-enseignant.component';

import { AjouterAnneeComponent } from './anneeScolaire/ajouter-annee/ajouter-annee.component';
import { ListeAnneesComponent } from './anneeScolaire/liste-annees/liste-annees.component';
import { ModifierAnneeComponent } from './anneeScolaire/modifier-annee/modifier-annee.component';
import { AjouterSessionComponent } from './SessionScolaire/ajouter-session/ajouter-session.component';
import { ListeSessionsComponent } from './SessionScolaire/liste-sessions/liste-sessions.component';
import { ModifierSessionComponent } from './SessionScolaire/modifier-session/modifier-session.component';
import { InscriptionComponent } from './Elèves/inscription/inscription.component';
import { AjouterEventComponent } from './events/ajouter-event/ajouter-event.component';
import { ListeEventsComponent } from './events/liste-events/liste-events.component';
import { AfficherEventComponent } from './events/afficher-event/afficher-event.component';
import { ModifierEventComponent } from './events/modifier-event/modifier-event.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
       //AnneeScolaire components
       {
        path: 'ajouterAnnee',
        component: AjouterAnneeComponent
      },
      {
        path: 'listeAnnees',
        component: ListeAnneesComponent
      },
      {
        path: 'modifierAnnee/:id',
        component: ModifierAnneeComponent
      },
       //SessionScolaire components
       {
        path: 'ajouterSession',
        component: AjouterSessionComponent
      },
      {
        path: 'listeSessions',
        component: ListeSessionsComponent
      },
      {
        path: 'modifierSession/:id',
        component: ModifierSessionComponent
      },
      //Eleve components 
      {
        path: 'InscrireEleve/:id',
        component: InscriptionComponent
      },
      {
        path: 'ajouterEleve',
        component: AjouterElevesComponent
      },
      {
        path: 'listEleves',
        component: ListElevesComponent
      },
      {
        path: 'modifierEleve/:id',
        component: ModifierEleveComponent
      },
      {
        path: 'afficherEleve/:id',
        component: AfficherEleveComponent
      },
      {
        path: 'listPreinscrit',
        component: DemandePreinscriptionComponent
      },
      {
        path: 'validerPreinscrit/:id',
        component: ValiderPreinscriptionComponent
      },


      //Parent components 

      {
        path: 'listParents',
        component: ListParentsComponent
      },
      {
        path: 'afficherParent/:id',
        component: AfficherParentComponent
      },

      
      

      //Matière components 

      {
        path: 'ajouterMatiere',
        component: AjouterMatiereComponent
      },
      {
        path: 'listMatieres',
        component: ListMatiereComponent
      },


      //Niveau components 

      {
        path: 'ajouterNiveau',
        component: AjouterNiveauComponent
      },
      {
        path: 'listNiveaux',
        component: ListNiveauComponent
      },
      {
        path: 'afficherNiveau/:id',
        component: AfficherNiveauComponent
      },
      {
        path: 'modifierNiveau/:id',
        component: ModifierNiveauComponent
      },

      //Groupe components 

      {
        path: 'ajouterGroupe',
        component: AjouterGroupeComponent
      },
      {
        path: 'listGroupes',
        component: ListGroupeComponent
      },
      {
        path: 'modifierGroupe/:id',
        component: ModifierGroupeComponent
      },
      {
        path: 'afficherEleves/:id',
        component: AfficherGroupeComponent
      },
      {
        path: 'afficherEnseignants/:id',
        component: AfficherEnseignantsComponent
      },
      {
        path: 'affecterEnseignant/:id',
        component: AffecterEnseignantComponent
      },


      

      

      //Events:
      {
        path: 'ajouterEvent',
        component: AjouterEventComponent
      },
      {
        path: 'ListeEvents',
        component: ListeEventsComponent
      },
      {
        path: 'afficherEvent/:id',
        component: AfficherEventComponent
      },
      {
        path: 'modifierEvent/:id',
        component: ModifierEventComponent
      },
      

      
      
      





    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminRoutingModule { }
