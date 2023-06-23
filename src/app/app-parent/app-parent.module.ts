import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppParentRoutingModule } from './app-parent-routing.module';
import { AfficherProfileComponent } from './Profile/afficher-profile/afficher-profile.component';
import { ModifierProfileComponent } from './Profile/modifier-profile/modifier-profile.component';
import { FormsModule } from '@angular/forms';
import { DisciplineComponent } from './discipline/discipline.component';
import { ListePunitionsComponent } from './punition/liste-punitions/liste-punitions.component';
import { AfficherPunitionComponent } from './punition/afficher-punition/afficher-punition.component';
import { NotesComponent } from './notes/notes.component';
import { EmploiComponent } from './emploi/emploi.component';
import { BulletinsComponent } from './Bulletins/bulletins/bulletins.component';
import { DetailsBulletinComponent } from './Bulletins/details-bulletin/details-bulletin.component';


@NgModule({
  declarations: [
    AfficherProfileComponent,
    ModifierProfileComponent,
    DisciplineComponent,
    ListePunitionsComponent,
    AfficherPunitionComponent,
    NotesComponent,
    EmploiComponent,
    BulletinsComponent,
    DetailsBulletinComponent
  ],
  imports: [
    CommonModule,
    AppParentRoutingModule,
    FormsModule

  ]
})
export class AppParentModule { }
