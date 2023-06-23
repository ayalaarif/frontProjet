import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../shared/components/home-layout/home-layout.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { PreInscriptionComponent } from './pre-inscription/pre-inscription.component';

const routes: Routes = [
  {
    path:'',
    component: HomeLayoutComponent,
    children:[
      {
        path:'',
        component:MainHomeComponent
      },
      {
        path:'preInscrit',
        component: PreInscriptionComponent
      },
      {
        path:'contact',
        component: ContactComponent
      },
      {
        path:'about',
        component: AboutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
