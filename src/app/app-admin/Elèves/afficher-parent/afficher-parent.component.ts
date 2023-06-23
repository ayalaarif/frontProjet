import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParentService } from 'src/app/shared/services/parent.service';
import { AnneeScolaireService } from 'src/app/shared/services/annee-scolaire.service';
@Component({
  selector: 'app-afficher-parent',
  templateUrl: './afficher-parent.component.html',
  styleUrls: ['./afficher-parent.component.css']
})
export class AfficherParentComponent implements OnInit {
  id!: number;
  data!: any;
annee_id!:number
  constructor(private route: ActivatedRoute, private parentService: ParentService,public anneeService: AnneeScolaireService) { }

  ngOnInit(): void {
    // this.anneeService.currentAnneeScolaire.subscribe(annee_id=>this.annee_id=annee_id)
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getParentById();
  }



  getParentById(){
    this.parentService.getParentById(this.id,this.annee_id).subscribe(res=>{
      console.log(res);
      this.data= res;
      this.data.eleves = this.data.eleves.filter((element:any) => element.groupes.length>0);
    })

  }

}
