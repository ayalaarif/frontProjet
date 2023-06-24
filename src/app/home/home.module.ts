import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainHomeComponent } from './main-home/main-home.component';
import { PreInscriptionComponent } from './pre-inscription/pre-inscription.component';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    MainHomeComponent,
    PreInscriptionComponent,
    ContactComponent,
    AboutComponent,
  
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    


  ]
})
export class HomeModule { }
