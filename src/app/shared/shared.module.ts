import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInerceptorService} from './services/token-inerceptor.service';
import { EnseignantLayoutComponent } from './components/enseignant-layout/enseignant-layout.component';
import { DownloadFileService } from './services/download-file.service';
import { EnseignantNavbarComponent } from './components/enseignant-navbar/enseignant-navbar.component';
import { EleveNavbarComponent } from './components/eleve-navbar/eleve-navbar/eleve-navbar.component';
import { ParentNavbarComponent } from './components/parent-navbar/parent-navbar.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeLayoutComponent,
    NotFound404Component,
    EnseignantLayoutComponent,
    EnseignantNavbarComponent,
    EleveNavbarComponent,
    ParentNavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInerceptorService,
      multi: true
    },
     DownloadFileService
  ],
})
export class SharedModule { }
