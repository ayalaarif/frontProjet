import { Component, OnInit } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';


@Component({
  selector: 'app-list-groupes',
  templateUrl: './list-groupes.component.html',
  styleUrls: ['./list-groupes.component.css']
})
export class ListGroupesComponent implements OnInit {
  groupes: any;
  id!:number
  annee_id!:number
  
  constructor(private authService: AuthService, private gs: GroupeService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.id=this.authService.getEnseignantId()
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    this.listGroupes();
  }
  listGroupes() {
    this.gs.listGroupe(this.id,this.annee_id).subscribe(res => {
      this.groupes = res;
      console.log(this.groupes);

    })
  }

}
