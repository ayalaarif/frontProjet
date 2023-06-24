import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppEleveRoutingModule } from './app-eleve-routing.module';
import { AfficherProfileComponent } from './profile/afficher-profile/afficher-profile.component';
import { ModifierProfileEleveComponent } from './profile/modifier-profile-eleve/modifier-profile-eleve.component';
import { FormsModule } from '@angular/forms';
import { CoursComponent } from './cours/cours.component';
import { ExamensComponent } from './examens/examens.component';
import { NotesComponent } from './notes/notes.component';
import { TravauxComponent } from './travaux/travaux.component';
import { EmploiEleveComponent } from './emploi-eleve/emploi-eleve.component';
import { BulletinsComponent } from './Bulletins/bulletins/bulletins.component';
import { DetailsBulletinComponent } from './Bulletins/details-bulletin/details-bulletin.component';
import { ChatsComponent } from './Chat/chats/chats.component';
import { AccueilComponent } from './Accueil/accueil/accueil.component';
import { AcceuilEtudiantComponent } from './acceuil-etudiant/acceuil-etudiant.component';
import { SpecialiteComponent } from './specialite/specialite.component';
import { UvDetailsComponent } from './uv-details/uv-details.component';
import { ProfileAutreEtudiantComponent } from './profile-autre-etudiant/profile-autre-etudiant.component';
import { CoursAutreEtudiantComponent } from './cours-autre-etudiant/cours-autre-etudiant.component';
import { LogementsComponent } from './logements/logements.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AssociationsComponent } from './associations/associations.component';


@NgModule({
  declarations: [
    AfficherProfileComponent,
    ModifierProfileEleveComponent,
    CoursComponent,
    ExamensComponent,
    NotesComponent,
    TravauxComponent,
    EmploiEleveComponent,
    BulletinsComponent,
    DetailsBulletinComponent,
    ChatsComponent,
    AccueilComponent,
    AcceuilEtudiantComponent,
    SpecialiteComponent,
    UvDetailsComponent,
    ProfileAutreEtudiantComponent,
    CoursAutreEtudiantComponent,
    LogementsComponent,
    RestaurantsComponent,
    AssociationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppEleveRoutingModule
  ],
  providers: [
  ],
})
export class AppEleveModule { 
  
}
