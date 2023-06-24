import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminRoutingModule } from './app-admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AjouterElevesComponent } from './Elèves/ajouter-eleves/ajouter-eleves.component';
import { ListElevesComponent } from './Elèves/list-eleves/list-eleves.component';
import { ListParentsComponent } from './Elèves/list-parents/list-parents.component';
import { AjouterMatiereComponent } from './Matières/ajouter-matiere/ajouter-matiere.component';
import { ListMatiereComponent } from './Matières/list-matiere/list-matiere.component';
import { AjouterNiveauComponent } from './niveaux/ajouter-niveau/ajouter-niveau.component';
import { ListNiveauComponent } from './niveaux/list-niveau/list-niveau.component';
import { AjouterGroupeComponent } from './Groupes/ajouter-groupe/ajouter-groupe.component';
import { ListGroupeComponent } from './Groupes/list-groupe/list-groupe.component';

import { FormsModule } from '@angular/forms';

import { ModifierEleveComponent } from './Elèves/modifier-eleve/modifier-eleve.component';
import { AfficherEleveComponent } from './Elèves/afficher-eleve/afficher-eleve.component';
import { AfficherParentComponent } from './Elèves/afficher-parent/afficher-parent.component';

import { AfficherNiveauComponent } from './niveaux/afficher-niveau/afficher-niveau.component';
import { ModifierNiveauComponent } from './niveaux/modifier-niveau/modifier-niveau.component';
import { ModifierGroupeComponent } from './Groupes/modifier-groupe/modifier-groupe.component';
import { AfficherGroupeComponent } from './Groupes/afficher-groupe/afficher-groupe.component';
import { ValiderPreinscriptionComponent } from './Elèves/valider-preinscription/valider-preinscription.component';
import { DemandePreinscriptionComponent } from './Elèves/demande-preinscription/demande-preinscription.component';
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
import { ModifierEventComponent } from './events/modifier-event/modifier-event.component';
import { AfficherEventComponent } from './events/afficher-event/afficher-event.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AjouterElevesComponent,
    ListElevesComponent,
    ListParentsComponent,
    AjouterMatiereComponent,
    ListMatiereComponent,
    AjouterNiveauComponent,
    ListNiveauComponent,
    AjouterGroupeComponent,
    ListGroupeComponent,
    
    ModifierEleveComponent,
    AfficherEleveComponent,
    AfficherParentComponent,
   
    AfficherNiveauComponent,
    ModifierNiveauComponent,
    ModifierGroupeComponent,
    AfficherGroupeComponent,
    ValiderPreinscriptionComponent,
    DemandePreinscriptionComponent,
    AfficherEnseignantsComponent,
    AffecterEnseignantComponent,
    
    AjouterAnneeComponent,
    ListeAnneesComponent,
    ModifierAnneeComponent,
    AjouterSessionComponent,
    ListeSessionsComponent,
    ModifierSessionComponent,
    InscriptionComponent,
    
    AjouterEventComponent,
    ListeEventsComponent,
    ModifierEventComponent,
    AfficherEventComponent,
    
   
  ],
  imports: [
    AppAdminRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  exports:[
    FormsModule
  ]
})
export class AppAdminModule { }
