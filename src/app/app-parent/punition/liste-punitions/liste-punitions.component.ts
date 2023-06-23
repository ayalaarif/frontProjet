import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParentService } from 'src/app/shared/services/parent.service';
import { PunitionService } from 'src/app/shared/services/punition.service';

@Component({
  selector: 'app-liste-punitions',
  templateUrl: './liste-punitions.component.html',
  styleUrls: ['./liste-punitions.component.css']
})
export class ListePunitionsComponent implements OnInit {
  punitions:any
  eleveId=0
  l!:number
  id!: number;
  parent!: any
  clicked: boolean=false
  annee_id!:number


  constructor(private authService: AuthService, private ps:ParentService, private punitionService:PunitionService) { }

  ngOnInit(): void {
    let a=sessionStorage.getItem('annee');
    if (a) {
      
      this.annee_id= JSON.parse(a).id
      console.log(this.annee_id)
    }
    this.id = this.authService.getParentId()
    this.getParentById()

  }

  getPunitionsByEleveId(id:number){
    this.punitionService.getPunitionsByEleveId(id,this.annee_id).subscribe(res => {
   console.log(res);
   this.punitions= res;
 })
 }

 onSelect(){
  this.getPunitionsByEleveId(this.eleveId)  
  this.clicked=true
}


  getParentById(){
    this.ps.getParentById(this.id,this.annee_id).subscribe(res=> {
      console.log(res);
      this.parent= res;
      this.parent.eleves = this.parent.eleves.filter((element:any) => element.groupes.length>0);
      this.l=this.parent.eleves.length
      if(this.l==1){
        this.getPunitionsByEleveId(this.parent.eleves[0].id)
    }

    })
  }

}
