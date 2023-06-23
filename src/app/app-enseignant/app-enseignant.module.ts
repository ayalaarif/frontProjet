import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppEnseignantRoutingModule } from './app-enseignant-routing.module';
import { ProfileEnseignantComponent } from './profile-enseignant/profile-enseignant.component';
import { AjouterCoursComponent } from './cours/ajouter-cours/ajouter-cours.component';
import { ListCoursComponent } from './cours/list-cours/list-cours.component';
import { ListTraveauxComponent } from './traveaux/list-traveaux/list-traveaux.component';
import { AjouterTraveauComponent } from './traveaux/ajouter-traveau/ajouter-traveau.component';
import { FormsModule} from '@angular/forms';
import { AjouterExamenComponent } from './examens/ajouter-examen/ajouter-examen.component';
import { ListExamensComponent } from './examens/list-examens/list-examens.component';
import { ModifierExamenComponent } from './examens/modifier-examen/modifier-examen.component';
import { AffecterGroupeComponent } from './examens/affecter-groupe/affecter-groupe.component';
import { AffecterNotesComponent } from './notes/affecter-notes/affecter-notes.component';
import { AffecterGroupesCoursComponent } from './cours/affecter-groupes-cours/affecter-groupes-cours.component';
import { ListGroupesComponent } from './groupes/list-groupes/list-groupes.component';
import { DashboardEnseignantComponent } from './dashboard-enseignant/dashboard-enseignant.component';
import { ListExamenGroupesComponent } from './examens/list-examen-groupes/list-examen-groupes.component';
import { ListCoursGroupesComponent } from './cours/list-cours-groupes/list-cours-groupes.component';
import { ModifierProfileComponent } from './modifier-profile/modifier-profile.component';
import { ModifierTraveauComponent } from './traveaux/modifier-traveau/modifier-traveau.component';
import { AfficherNotesComponent } from './notes/afficher-notes/afficher-notes.component';
import { EmploiEnseignantComponent } from './emploi-enseignant/emploi-enseignant.component';
import { MarquerAbsencesComponent } from './Gestion_absences/marquer-absences/marquer-absences.component';
import { AjouterPunitionComponent } from './punition/ajouter-punition/ajouter-punition.component';
import { ListePunitionsComponent } from './punition/liste-punitions/liste-punitions.component';
import { ModifierPunitionComponent } from './punition/modifier-punition/modifier-punition.component';
import { AfficherPunitionComponent } from './punition/afficher-punition/afficher-punition.component';
import { ListeAbsencesComponent } from './Gestion_absences/liste-absences/liste-absences.component';



@NgModule({
  declarations: [
    ProfileEnseignantComponent,
    AjouterCoursComponent,
    ListCoursComponent,
    ListTraveauxComponent,
    AjouterTraveauComponent,
    AjouterExamenComponent,
    ListExamensComponent,
    ModifierExamenComponent,
    AffecterGroupeComponent,
    AffecterNotesComponent,
    AffecterGroupesCoursComponent,
    ListGroupesComponent,
    DashboardEnseignantComponent,
    ListExamenGroupesComponent,
    ListCoursGroupesComponent,
    ModifierProfileComponent,
    ModifierTraveauComponent,
    AfficherNotesComponent,
    EmploiEnseignantComponent,
    MarquerAbsencesComponent,
    AjouterPunitionComponent,
    ListePunitionsComponent,
    ModifierPunitionComponent,
    AfficherPunitionComponent,
    ListeAbsencesComponent,
    
  ],
  imports: [
    CommonModule,
    AppEnseignantRoutingModule,
    SharedModule,
    FormsModule
    
  

  ],
  exports:[
    FormsModule
  ]
})
export class AppEnseignantModule { }
