import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppAdminModule } from './app-admin/app-admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fr from '@angular/common/locales/fr';
import {  registerLocaleData } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAdminModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }