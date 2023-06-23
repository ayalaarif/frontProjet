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
