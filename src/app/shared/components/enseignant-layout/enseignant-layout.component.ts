import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AnneeScolaire } from '../../models/annee-scolaire.model';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';

@Component({
  selector: 'app-enseignant-layout',
  templateUrl: './enseignant-layout.component.html',
  styleUrls: ['./enseignant-layout.component.css']
})
export class EnseignantLayoutComponent implements OnInit {

  user!: User;
  A=new AnneeScolaire()
  data:any
  constructor(private authService: AuthService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString)
    }
    let a=sessionStorage.getItem('annee');
    if (a) {
      this.A = JSON.parse(a)
     
    }
  //   this.anneeService.getlastyear().subscribe(res=>{
  //     console.log(res);
  //     this.data=res
  //     this.A=this.data;
  //      this.anneeService.changeAnneeScolaire(this.A.id)
  //    this.A=this.data
  //    console.log(this.A)
        
    
   
  // })
}

  logout() {
    this.authService.logout();
  }

}
